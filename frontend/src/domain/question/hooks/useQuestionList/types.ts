/**
 * @module UseQuestionListTypes
 * @summary Type definitions for useQuestionList hook
 * @domain question
 * @category hooks
 */

import type { Question, QuestionListParams } from '../../types';

export interface UseQuestionListOptions {
  filters?: QuestionListParams;
}

export interface UseQuestionListReturn {
  data: Question[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
