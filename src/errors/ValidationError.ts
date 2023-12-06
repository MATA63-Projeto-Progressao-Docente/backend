import { ZodError } from 'zod';
import ApiError from './ApiError';

class ValidationError extends ApiError {
  static fromZod(error: ZodError) {
    return new this({ message: 'Invalid data', details: error.issues }, 400);
  }

  static badRequest(message: string) {
    return new this(message, 400);
  }
}

export default ValidationError;
