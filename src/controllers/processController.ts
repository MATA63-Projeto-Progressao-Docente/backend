/* eslint-disable import/prefer-default-export */
import { NextFunction, Response } from 'express';
import z, { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import ValidationError from '../errors/ValidationError';
import HttpStatusCodes from '../enums/HttpStatusCodes';
import processService from '../services/processService';
import ProcessStatus from '../enums/ProcessStatus';
import PrismaError from '../errors/PrismaError';
import { AuthenticatedRequest } from '../types';
import professorService from '../services/professorService';

export async function createProcess(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const validatorSchema = z.object({
    targetClassId: z.number().int().positive({
      message: 'Target Class invalid or Professor cannot progress further.',
    }),
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

  const { userId = req.body.userId } = req;

  const { classId, id: professorId } = await professorService.getByUserId(userId);

  /* Do jeito que está organizado na tabela de classes, a próxima classe à ser progredida está logo acima, sendo a mais alta com o id 1 */
  const processData = { ...req.body, professorId, targetClassId: classId - 1 };

  const validationResult = validatorSchema.safeParse(processData);

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
