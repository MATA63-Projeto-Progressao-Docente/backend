/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import ValidationError from '../errors/ValidationError';
import HttpStatusCodes from '../enums/HttpStatusCodes';
import processService from '../services/processService';
import ProcessStatus from '../enums/ProcessStatus';
import PrismaError from '../errors/PrismaError';

export async function createProcess(req: Request, res: Response, next: NextFunction) {
  const validatorSchema = z.object({
    targetClassId: z.number().int().positive(),
    professorId: z.number().int().positive(),
    status: z.nativeEnum(ProcessStatus).optional(),
    documents: z.array(
      z.object({
        url: z.string().url(),
        totalPoints: z.number().int().positive(),
        activityId: z.number().int().positive(),
      }),
    ),
  });

  const validationResult = validatorSchema.safeParse(req.body);

  if (!validationResult.success) {
    return next(ValidationError.fromZod(validationResult.error as ZodError));
  }

  try {
    const process = await processService.createProcess(validationResult.data);

    return res.status(HttpStatusCodes.CREATED).json(process);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return next(PrismaError.fromPrismaError(e));
    }

    return next(e);
  }
}
