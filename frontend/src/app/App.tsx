import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/core/lib/queryClient';
import { AppRouter } from './router';

/**
 * @component App
 * @summary Root application component
 * @domain core
 * @type root-component
 * @category application
 *
 * @description
 * Main application component that provides global context providers
 * and routing configuration.
 */
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};
