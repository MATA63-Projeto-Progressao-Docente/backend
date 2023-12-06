import { Request, Response, NextFunction } from 'express';
import z, { ZodError } from 'zod';
import { Role } from '@prisma/client';
import ValidationError from '../errors/ValidationError';
import authService from '../services/authService';
import userService from '../services/userService';
import { AuthenticatedRequest } from '../types';
import processService from '../services/processService';

// eslint-disable-next-line import/prefer-default-export
export async function register(req: Request, res: Response, next: NextFunction) {
  const registerSchema = z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      }),
    role: z
      .nativeEnum(Role)
      .optional(),
  });

  const validationResult = registerSchema.safeParse(req.body);

  if (!validationResult.success) {
    return next(ValidationError.fromZod(validationResult.error as ZodError));
  }

  try {
    const data = await authService.register(validationResult.data);

    return res.status(201).json(data);
  } catch (e) {
    return next(e);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await userService.getAll();

    return res.status(201).json(data);
  } catch (e) {
    return next(e);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await userService.getOne(parseInt(req.params.userId, 10));

    return res.status(201).json(data);
  } catch (e) {
    return next(e);
  }
}

export async function getUserInfo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) { return res.status(401).json({ message: 'User not Authenticated' }); }
    const data = await userService.getOne(req.userId);
    const processes = await processService.getProcessesFromUser(req.userId);
    return res.status(201).json({ ...data, processes });
  } catch (e) {
    return next(e);
  }
}
