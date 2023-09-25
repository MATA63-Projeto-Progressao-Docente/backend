import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import authService from '../services/authService';
import { tokenTTL } from '../config';
import ValidationError from '../errors/ValidationError';

export async function login(req: Request, res: Response, next: NextFunction) {
  const loginSchema = z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      }),
  });

  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    return next(ValidationError.fromZod(validationResult.error as ZodError));
  }

  try {
    const token = await authService.login(validationResult.data);

    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: tokenTTL });
  } catch (e) {
    return next(e);
  }

  return res.status(204).send();
}

export async function logout(req: Request, res: Response) {
  res.clearCookie('token');

  res.status(204).send();
}
