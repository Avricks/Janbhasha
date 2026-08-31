/**
 * Janbhasha Accessible Input Component
 * Follows WCAG 2.1 AA Standards
 * 
 * Features:
 * - Always visible, associated labels
 * - Clear validation feedback
 * - Error messages with solutions
 * - Minimum 48px height
 * - Full keyboard support
 * - Mobile-optimized input methods
 */

import React, { forwardRef, useId } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Required for accessibility
  label: string;
  
  // Validation
  error?: string;
  success?: boolean;
  hint?: string;
  
  // Input behavior
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'url' | 'search';
  
  // Accessibility
  ariaDescribedBy?: string;
  ariaLabel?: string;
}

/**
 * Accessible Input Component
 * 
 * Usage:
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * 
 * With validation:
 * <Input
 *   label="Username"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 *   error={usernameError}
 *   hint="3-20 characters"
 * />
 * 
 * With success state:
 * <Input
 *   label="Password"
 *   type="password"
 *   success={passwordValid}
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    success = false,
    hint,
    inputMode = 'text',
    ariaDescribedBy,
    ariaLabel,
    required = false,
    disabled = false,
    className = '',
    id: providedId,
    ...props
  }, ref) => {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const describedBy = [
      ariaDescribedBy,
      errorId,
      hintId,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    const containerClasses = [
      'input-group',
      error ? 'input-group--error' : '',
      success ? 'input-group--success' : '',
      disabled ? 'input-group--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required" aria-label="required">*</span>}
        </label>

        <div className="input-wrapper">
          <input
            ref={ref}
            id={inputId}
            className="input-field"
            inputMode={inputMode}
            disabled={disabled}
            required={required}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            aria-invalid={!!error}
            {...props}
          />
          
          {success && !error && (
            <span className="input-indicator input-indicator--success" aria-hidden="true">
              ✓
            </span>
          )}
          
          {error && (
            <span className="input-indicator input-indicator--error" aria-hidden="true">
              !
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} className="input-error" role="alert">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={hintId} className="input-hint">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
