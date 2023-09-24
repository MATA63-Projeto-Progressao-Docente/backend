import { Request, Response } from 'express';
import ApiError from '../errors/ApiError';

export default function handleError(err: unknown, _req: Request, res: Response) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'Something went wrong', details: err });
}
