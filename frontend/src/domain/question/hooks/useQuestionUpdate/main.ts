/**
 * @hook useQuestionUpdate
 * @summary Hook for updating existing questions
 * @domain question
 * @type domain-hook
 * @category data
 *
 * @description
 * Provides mutation for updating questions with automatic cache invalidation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questionService } from '../../services/questionService';
import type { UseQuestionUpdateReturn } from './types';

export const useQuestionUpdate = (): UseQuestionUpdateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => questionService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });

  return {
    update: (id, data) => mutateAsync({ id, data }),
    isUpdating: isPending,
    error: error as Error | null,
  };
};
