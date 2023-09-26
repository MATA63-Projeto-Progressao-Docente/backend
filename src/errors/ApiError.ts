abstract class ApiError extends Error {
  public readonly statusCode: number;

  public readonly details: unknown;

  protected constructor(
    message: string | { message: string, details: unknown },
    statusCode = 400,
  ) {
    super(typeof message === 'string' ? message : message.message);
    this.statusCode = statusCode;
    this.details = typeof message === 'string' ? undefined : message.details;
  }
}

export default ApiError;
