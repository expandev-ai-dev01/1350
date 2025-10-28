/**
 * @hook useQuestionDelete
 * @summary Hook for deleting questions
 * @domain question
 * @type domain-hook
 * @category data
 *
 * @description
 * Provides mutation for deleting questions with automatic cache invalidation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questionService } from '../../services/questionService';
import type { UseQuestionDeleteReturn } from './types';

export const useQuestionDelete = (): UseQuestionDeleteReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: questionService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });

  return {
    deleteQuestion: mutateAsync,
    isDeleting: isPending,
    error: error as Error | null,
  };
};
