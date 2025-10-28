import { getLoadingSpinnerClassName } from './variants';
import type { LoadingSpinnerProps } from './types';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component for async operations
 * @domain core
 * @type ui-component
 * @category feedback
 *
 * @props
 * @param {LoadingSpinnerProps} props
 *   - size: Spinner size variant
 *   - className: Additional CSS classes
 */
export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { size = 'md', className } = props;

  return (
    <div className="flex items-center justify-center p-8">
      <div className={getLoadingSpinnerClassName({ size, className })}>
        <div className="animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    </div>
  );
};
