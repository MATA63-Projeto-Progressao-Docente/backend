import { ZodError } from 'zod';
import ApiError from './ApiError';

class ValidationError extends ApiError {
  static fromZod(error: ZodError) {
    return new this({ message: 'Invalid data', details: error }, 400);
  }
}

export default ValidationError;
