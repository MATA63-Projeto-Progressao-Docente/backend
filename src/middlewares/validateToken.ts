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
  const { token } = req.cookies;

  if (!token) {
    next(AuthError.missingToken());
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!, {
      maxAge: `${tokenTTL}ms`,
    }) as JWTPayload;

    req.userId = decodedToken.userId;
    req.userRole = decodedToken.role;
    next();
  } catch (err) {
    next(AuthError.invalidToken());
  }
}
