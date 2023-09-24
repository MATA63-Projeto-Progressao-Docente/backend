import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthError from '../errors/AuthError';
import { tokenTTL } from '../config';
import { AuthenticatedRequest, JWTPayload } from '../types';

export default function validateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token: string | null = req.cookies.token;

  if (!token) {
    return next(AuthError.missingToken());
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!, {
      maxAge: `${tokenTTL}ms`,
    }) as JWTPayload;

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    next(AuthError.invalidToken());
  }
}
