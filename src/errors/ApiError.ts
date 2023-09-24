abstract class ApiError {
  public readonly statusCode: number;
  public readonly message: string;

  protected constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ApiError;
