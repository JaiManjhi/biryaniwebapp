'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.css';

/* ═══════════════════════════════════════════════════════
   Button — Shared Component
   
   Variants: primary (gold fill), secondary (outline),
   danger, success, ghost.
   
   States: normal, hover (lift+glow), pressed (compress),
   loading, disabled (reduced opacity).
   ═══════════════════════════════════════════════════════ */

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${
          fullWidth ? styles.fullWidth : ''
        } ${isLoading ? styles.loading : ''} ${className}`}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <span className={styles.spinner} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className={styles.spinnerIcon}>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
              />
            </svg>
          </span>
        )}
        {!isLoading && leftIcon && (
          <span className={styles.icon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={styles.label}>{children}</span>
        {!isLoading && rightIcon && (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
