/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import ValidationError from '../errors/ValidationError';
import HttpStatusCodes from '../enums/HttpStatusCodes';
import processService from '../services/processService';
import ProcessStatus from '../enums/ProcessStatus';
import PrismaError from '../errors/PrismaError';
import { AuthenticatedRequest } from '../types';

export async function getUserProcesses(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const processes = await processService.getUserProcesses(req.userId!);

    return res.status(HttpStatusCodes.OK).json({ processes });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return next(PrismaError.fromPrismaError(e));
    }

    return next(e);
  }
}

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

export async function assignEvaluationCommittee(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const validatorSchema = z.object({
    professorIds: z
      .number({
        required_error: 'Ao menos um ID deve ser fornecido',
        invalid_type_error: 'O ID deve ser um número',
      })
      .int().positive()
      .array()
      .nonempty({ message: 'Ao menos um ID deve ser fornecido' }),
  });

  const validationResult = validatorSchema.safeParse(req.body);

  if (!validationResult.success) {
    return next(ValidationError.fromZod(validationResult.error as ZodError));
  }

  const result = processService
    .assignEvaluationCommittee(Number(req.params.id), validationResult.data.professorIds);

  return res.status(200).json(result);
}
