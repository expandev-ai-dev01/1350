import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas
 *
 * @module utils/validation
 *
 * @description
 * Provides reusable Zod validation schemas for common data types
 */

/**
 * @summary
 * String validation with max length
 *
 * @param {number} [maxLength] - Maximum string length
 * @returns {z.ZodString} Zod string schema
 */
export const zString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema;
};

/**
 * @summary
 * Nullable string validation with max length
 *
 * @param {number} [maxLength] - Maximum string length
 * @returns {z.ZodNullable<z.ZodString>} Zod nullable string schema
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary
 * Name validation (1-200 characters)
 */
export const zName = z.string().min(1).max(200);

/**
 * @summary
 * Description validation (max 500 characters, nullable)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary
 * Foreign key validation (positive integer, nullable)
 */
export const zNullableFK = z.number().int().positive().nullable();

/**
 * @summary
 * Foreign key validation (positive integer)
 */
export const zFK = z.number().int().positive();

/**
 * @summary
 * Bit/Boolean validation
 */
export const zBit = z.boolean();

/**
 * @summary
 * Date string validation (ISO format)
 */
export const zDateString = z.string().datetime();

/**
 * @summary
 * Email validation
 */
export const zEmail = z.string().email().max(255);

/**
 * @summary
 * Positive number validation
 */
export const zPositiveNumber = z.number().positive();

/**
 * @summary
 * Non-negative number validation
 */
export const zNonNegativeNumber = z.number().min(0);
