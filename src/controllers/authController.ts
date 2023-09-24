import { Request, Response } from 'express';
import authService from '../services/authService';
import { z } from 'zod';
import { tokenTTL } from '../config';

export async function signUp(req: Request, res: Response) {
  const { name, email } = req.body;

  const result = await authService.registerUser(name, email);

  res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(72),
  });

  const data = loginSchema.parse(req.body);

  const { token } = await authService.login(data);

  res.cookie('token', token, { httpOnly: true, secure: true, maxAge: tokenTTL });

  res.status(204).send();
}
