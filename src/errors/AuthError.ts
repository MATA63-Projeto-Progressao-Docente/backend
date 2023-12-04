import ApiError from './ApiError';

class AuthError extends ApiError {
  static invalidToken() {
    return new this('Invalid token', 401);
  }

  static missingToken() {
    return new this('Not authenticated', 401);
  }

  static unauthorized() {
    throw new this('Forbidden access', 403);
  }

  static invalidCredentials() {
    return new this('Provided credentials do not match any existing account.', 422);
  }
}

export default AuthError;
