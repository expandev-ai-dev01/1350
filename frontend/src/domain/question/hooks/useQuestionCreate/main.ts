/**
 * @hook useQuestionCreate
 * @summary Hook for creating new questions
 * @domain question
 * @type domain-hook
 * @category data
 *
 * @description
 * Provides mutation for creating questions with automatic cache invalidation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questionService } from '../../services/questionService';
import type { UseQuestionCreateReturn } from './types';

export const useQuestionCreate = (): UseQuestionCreateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: questionService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });

  return {
    create: mutateAsync,
    isCreating: isPending,
    error: error as Error | null,
  };
};
