import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../types';
import AuthError from '../errors/AuthError';

export default function passAdminRouter(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (req.userRole !== 'ADMIN') {
    return next(AuthError.forbidden());
  }

  return next();
}
