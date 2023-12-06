import { Request, Response, NextFunction } from 'express';
import fieldService from '../services/fieldService';

// eslint-disable-next-line import/prefer-default-export
export async function getAllFields(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await fieldService.getAll();

    return res.status(201).json(data);
  } catch (e) {
    return next(e);
  }
}

export async function getField(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await fieldService.getOne(parseInt(req.params.fieldId, 10));

    return res.status(201).json(data);
  } catch (e) {
    return next(e);
  }
}
