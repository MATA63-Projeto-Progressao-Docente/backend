import { NextFunction, Response } from 'express';
import HttpStatusCodes from '../enums/HttpStatusCodes';
import ValidationError from '../errors/ValidationError';
import { uploadDocument } from '../lib/firebase';
import { AuthenticatedRequest } from '../types';

export async function uploadFile(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (!req.file) {
    return next(ValidationError.badRequest('No file provided'));
  }

  const url = await uploadDocument(req.file!.buffer, req.file!.originalname);

  return res.status(HttpStatusCodes.OK).json({ url });
}
