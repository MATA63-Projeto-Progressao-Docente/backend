import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../types';
import AuthError from '../errors/AuthError';

export default function blockNonAdminUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (req.userRole !== 'ADMIN') {
    next(AuthError.unauthorized());
  }

  next();
}
