/**
 * @summary
 * Standardized API response utilities
 *
 * @module utils/response
 *
 * @description
 * Provides helper functions for creating consistent API responses
 */

/**
 * @interface SuccessResponse
 * @description Standard success response structure
 *
 * @property {boolean} success - Always true for success responses
 * @property {T} data - Response data
 * @property {Object} [metadata] - Optional metadata
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    page?: number;
    pageSize?: number;
    total?: number;
    timestamp: string;
  };
}

/**
 * @interface ErrorResponse
 * @description Standard error response structure
 *
 * @property {boolean} success - Always false for error responses
 * @property {Object} error - Error details
 * @property {string} timestamp - Error timestamp
 */
export interface ErrorResponse {
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
 * Creates a standardized success response
 *
 * @function successResponse
 *
 * @param {T} data - Response data
 * @param {Object} [metadata] - Optional metadata
 *
 * @returns {SuccessResponse<T>} Formatted success response
 *
 * @example
 * res.json(successResponse({ id: 1, name: 'Test' }));
 */
export function successResponse<T>(data: T, metadata?: any): SuccessResponse<T> {
  return {
    success: true,
    data,
    metadata: metadata
      ? { ...metadata, timestamp: new Date().toISOString() }
      : { timestamp: new Date().toISOString() },
  };
}

/**
 * @summary
 * Creates a standardized error response
 *
 * @function errorResponse
 *
 * @param {string} message - Error message
 * @param {string} [code] - Error code
 * @param {any} [details] - Additional error details
 *
 * @returns {ErrorResponse} Formatted error response
 *
 * @example
 * res.status(400).json(errorResponse('Invalid input', 'VALIDATION_ERROR'));
 */
export function errorResponse(
  message: string,
  code: string = 'ERROR',
  details?: any
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}
