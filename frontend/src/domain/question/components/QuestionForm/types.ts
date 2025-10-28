/**
 * @module QuestionFormTypes
 * @summary Type definitions for QuestionForm component
 * @domain question
 * @category components
 */

import type { Question, CreateQuestionDto } from '../../types';

export interface QuestionFormProps {
  question?: Question;
  onSubmit: (data: CreateQuestionDto) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}
