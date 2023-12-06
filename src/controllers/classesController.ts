import { Request, Response, NextFunction } from 'express';
import classesService from '../services/classesService';

// eslint-disable-next-line import/prefer-default-export
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await classesService.getAll();

    return res.status(201).json(data);
  } catch (e) {
    return next(e);
  }
}
