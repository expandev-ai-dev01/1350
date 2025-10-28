/**
 * @module UseQuestionDeleteTypes
 * @summary Type definitions for useQuestionDelete hook
 * @domain question
 * @category hooks
 */

export interface UseQuestionDeleteReturn {
  deleteQuestion: (id: string) => Promise<void>;
  isDeleting: boolean;
  error: Error | null;
}
