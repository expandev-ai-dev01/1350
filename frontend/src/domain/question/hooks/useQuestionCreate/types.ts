/**
 * @module UseQuestionCreateTypes
 * @summary Type definitions for useQuestionCreate hook
 * @domain question
 * @category hooks
 */

import type { CreateQuestionDto, Question } from '../../types';

export interface UseQuestionCreateReturn {
  create: (data: CreateQuestionDto) => Promise<Question>;
  isCreating: boolean;
  error: Error | null;
}
