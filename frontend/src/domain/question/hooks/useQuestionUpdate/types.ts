/**
 * @module UseQuestionUpdateTypes
 * @summary Type definitions for useQuestionUpdate hook
 * @domain question
 * @category hooks
 */

import type { UpdateQuestionDto, Question } from '../../types';

export interface UseQuestionUpdateReturn {
  update: (id: string, data: UpdateQuestionDto) => Promise<Question>;
  isUpdating: boolean;
  error: Error | null;
}
