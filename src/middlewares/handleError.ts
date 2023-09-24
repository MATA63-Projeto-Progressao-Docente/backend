import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';

export default function handleError(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, details: err.details });
  }

  return res.status(500).json({ message: err.message, details: err });
}
