/**
 * Janbhasha Accessible Button Component
 * Follows WCAG 2.1 AA and Government Accessibility Standards
 * 
 * Features:
 * - Minimum 48x48px touch target
 * - Visible focus indicator (2px outline)
 * - Full keyboard support
 * - Semantic HTML
 * - Loading and disabled states
 */

import React, { forwardRef } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Visual
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  
  // Content
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  
  // Accessibility
  ariaLabel?: string;
  ariaPressed?: boolean;
}

/**
 * Accessible Button Component
 * 
 * Usage:
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * With icon:
 * <Button icon={<SearchIcon />} ariaLabel="Search">
 *   Search
 * </Button>
 * 
 * Loading state:
 * <Button loading>
 *   Saving...
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    ariaLabel,
    className = '',
    children,
    ...props
  }, ref) => {
    const classes = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      loading ? 'btn--loading' : '',
      (disabled || loading) ? 'btn--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-busy={loading}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="btn__icon btn__icon--left" aria-hidden="true">
            {icon}
          </span>
        )}
        
        <span className="btn__text">
          {children}
        </span>
        
        {icon && iconPosition === 'right' && (
          <span className="btn__icon btn__icon--right" aria-hidden="true">
            {icon}
          </span>
        )}
        
        {loading && (
          <span className="btn__spinner" aria-hidden="true" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
