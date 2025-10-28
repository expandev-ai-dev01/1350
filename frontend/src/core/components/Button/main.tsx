import { forwardRef } from 'react';
import { getButtonClassName } from './variants';
import type { ButtonProps } from './types';

/**
 * @component Button
 * @summary Reusable button component with variants
 * @domain core
 * @type ui-component
 * @category form
 *
 * @props
 * @param {ButtonProps} props
 *   - variant: Button style variant
 *   - size: Button size
 *   - fullWidth: Full width button
 *   - disabled: Disabled state
 *   - children: Button content
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    className,
    children,
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={getButtonClassName({ variant, size, fullWidth, className })}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
