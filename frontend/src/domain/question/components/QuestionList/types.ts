/**
 * @module QuestionListTypes
 * @summary Type definitions for QuestionList component
 * @domain question
 * @category components
 */

import type { Question, QuestionListParams } from '../../types';

export interface QuestionListProps {
  filters?: QuestionListParams;
  onEdit?: (question: Question) => void;
  onDelete?: (id: string) => void;
}
