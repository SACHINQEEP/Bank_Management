class AppError {
  constructor(statusCode?: number, message?: string) {
    this.statusCode = statusCode || 400;
    this.message = message;

    // Error.captureStackTrace(this, this.constructor);
  }
  statusCode: number;
  message: string;
}

export default AppError;
