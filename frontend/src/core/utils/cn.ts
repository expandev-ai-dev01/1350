import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @utility cn
 * @summary Utility function to merge Tailwind CSS classes
 * @domain core
 * @type utility-function
 * @category styling
 *
 * @description
 * Combines clsx and tailwind-merge to safely merge CSS classes
 * while handling Tailwind class conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
