import ApiError from './ApiError';

class AuthError extends ApiError {
  static invalidToken() {
    throw new this('Invalid token', 498);
  }
  static missingToken() {
    return new this('Token not provided', 422);
  }
  static invalidCredentials() {
    return new this('Provided credentials do not match any existing account.', 422);
  }
}

export default AuthError;
