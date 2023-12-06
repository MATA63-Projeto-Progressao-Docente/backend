import ApiError from './ApiError';

class ProcessError extends ApiError {
  static processNotFound() {
    return new this('Process not found', 422);
  }

  static invalidProfessorForCommittee() {
    return new this('Professors must be from the same department and with higher level', 422);
  }
}

export default ProcessError;
