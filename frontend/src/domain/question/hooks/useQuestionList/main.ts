/**
 * @hook useQuestionList
 * @summary Hook for fetching and managing question list
 * @domain question
 * @type domain-hook
 * @category data
 *
 * @description
 * Provides question list data with filtering capabilities using TanStack Query
 */

import { useQuery } from '@tanstack/react-query';
import { questionService } from '../../services/questionService';
import type { UseQuestionListOptions, UseQuestionListReturn } from './types';

export const useQuestionList = (options: UseQuestionListOptions = {}): UseQuestionListReturn => {
  const { filters } = options;

  const queryKey = ['questions', filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => questionService.list(filters),
    staleTime: 2 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
