import { Request, Response, NextFunction } from 'express';

/**
 * @summary
 * Error response interface
 *
 * @interface ErrorResponse
 *
 * @property {boolean} success - Always false for errors
 * @property {Object} error - Error details
 * @property {string} timestamp - Error timestamp
 */
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @summary
 * Global error handling middleware
 *
 * @function errorMiddleware
 * @module middleware/error
 *
 * @param {Error} error - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @description
 * Catches and formats all errors in the application
 * Returns standardized error responses
 */
export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction): void {
  const statusCode = error.statusCode || 500;
  const errorCode = error.code || 'INTERNAL_SERVER_ERROR';
  const message = error.message || 'An unexpected error occurred';

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: errorCode,
      message: message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    },
    timestamp: new Date().toISOString(),
  };

  console.error('Error:', {
    code: errorCode,
    message: message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json(errorResponse);
}
