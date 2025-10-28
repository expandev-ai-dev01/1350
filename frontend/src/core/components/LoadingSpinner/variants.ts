import { clsx } from 'clsx';

export interface LoadingSpinnerVariantProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function getLoadingSpinnerClassName(props: LoadingSpinnerVariantProps): string {
  const { size = 'md', className } = props;

  return clsx(
    {
      'w-8 h-8': size === 'sm',
      'w-12 h-12': size === 'md',
      'w-16 h-16': size === 'lg',
    },
    className
  );
}
