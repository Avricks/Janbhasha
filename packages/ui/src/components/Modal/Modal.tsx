import React, { forwardRef, useEffect, useCallback } from 'react';
import { useFocusTrap } from '../../hooks';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  isDismissible?: boolean;
  ariaLabel?: string;
  role?: 'dialog' | 'alertdialog';
  className?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      actions,
      size = 'md',
      isDismissible = true,
      ariaLabel,
      role = 'dialog',
      className = '',
    },
    ref,
  ) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Use focus trap for accessibility
    useFocusTrap(contentRef, isOpen);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen && isDismissible) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        // Prevent body scroll when modal is open
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
          document.removeEventListener('keydown', handleEscape);
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        };
      }
    }, [isOpen, isDismissible, onClose]);

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDismissible && e.target === e.currentTarget) {
          onClose();
        }
      },
      [isDismissible, onClose],
    );

    if (!isOpen) {
      return null;
    }

    return (
      <div
        className={`modal-backdrop ${isOpen ? 'open' : ''}`}
        onClick={handleBackdropClick}
        role="presentation"
      >
        <div
          ref={ref || modalRef}
          className={`modal modal-${size} ${className}`}
          role={role}
          aria-modal="true"
          aria-label={ariaLabel || title}
          onClick={(e) => e.stopPropagation()}
        >
          <div ref={contentRef} className="modal-content">
            {/* Header */}
            {title && (
              <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
                {isDismissible && (
                  <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close dialog"
                    type="button"
                  >
                    <span aria-hidden="true">✕</span>
                  </button>
                )}
              </div>
            )}

            {!title && isDismissible && (
              <button
                className="modal-close modal-close-no-header"
                onClick={onClose}
                aria-label="Close dialog"
                type="button"
              >
                <span aria-hidden="true">✕</span>
              </button>
            )}

            {/* Body */}
            <div className="modal-body">{children}</div>

            {/* Footer/Actions */}
            {actions && <div className="modal-footer">{actions}</div>}
          </div>
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
