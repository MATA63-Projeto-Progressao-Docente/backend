import ActivityService from '../services/activityService';
import { NextFunction, Request, Response } from 'express';

export async function getAtivityByFildNumber (request: Request, response: Response) {
    const fieldAsNumber = parseInt(request.params.fieldId, 10);
    const numberAsNumber = parseInt(request.params.number, 10);
    const result = await ActivityService.getAtivityByFildNumber(fieldAsNumber, numberAsNumber)
    return response.status(200).json(result);
};

export async function getAllAtivity (request: Request, response: Response) {
    const result = await ActivityService.getAll()
    return response.status(200).json(result);
};