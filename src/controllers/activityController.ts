import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import ValidationError from '../errors/ValidationError';
import HttpStatusCodes from '../enums/HttpStatusCodes';
import PrismaError from '../errors/PrismaError';
import activityService from '../services/activityService';

export async function createActivity(req: Request, res: Response, next: NextFunction) {
  const validatorSchema = z.object({
    name: z.string(),
    number: z.number().int().positive(),
    points: z.number().int().positive(),
    fieldId: z.number().int().positive(),
  });

  const validationResult = validatorSchema.safeParse(req.body);

  if (!validationResult.success) {
    return next(ValidationError.fromZod(validationResult.error as ZodError));
  }

  try {
    const result = await activityService.createActivity(validationResult.data);

    return res.status(HttpStatusCodes.CREATED).json(result);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return next(PrismaError.fromPrismaError(e));
    }

    return next(e);
  }
}

export async function getActivityByFieldNumber(request: Request, response: Response) {
  const fieldAsNumber = parseInt(request.params.fieldId, 10);
  const numberAsNumber = parseInt(request.params.number, 10);
  const result = await activityService.getActivityByFildNumber(fieldAsNumber, numberAsNumber);
  return response.status(200).json(result);
}

export async function getAllActivity(request: Request, response: Response) {
  const result = await activityService.getAll();
  return response.status(200).json(result);
}
