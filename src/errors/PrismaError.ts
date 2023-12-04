import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import ApiError from './ApiError';

class PrismaError extends ApiError {
  static fromPrismaError(error: (
    PrismaClientKnownRequestError | Error
  )) {
    if (error instanceof PrismaClientKnownRequestError) {
      return new this({ message: error.message, details: error }, 422);
    }

    return new this(error.message, 500);
  }
}

export default PrismaError;
