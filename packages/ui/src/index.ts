/**
 * Janbhasha UI Component Library
 * Accessible, government-compliant UI components
 * 
 * Version: 1.0.0
 * Last Updated: 2026-08-31
 * 
 * Components:
 * - Button: Accessible button with multiple variants
 * - Input: Form input with validation
 * - OfflineIndicator: Network status display
 * - Navigation: Accessible navigation component
 * - Modal: Accessible modal/dialog component
 * 
 * Hooks:
 * - useOnlineStatus: Network connectivity tracking
 * - useAccessibility: Accessibility utilities
 * - useKeyboardNavigation: Keyboard shortcut handling
 * - useFocusTrap: Focus management for modals
 * - useMediaQuery: Responsive design detection
 * - usePrefersReducedMotion: Motion preference detection
 * - useDarkMode: Dark mode detection
 */

// Components
export { default as Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { default as Input } from './components/Input';
export type { InputProps } from './components/Input';

export { default as OfflineIndicator } from './components/OfflineIndicator';
export type { OfflineIndicatorProps } from './components/OfflineIndicator';

export { default as Navigation } from './components/Navigation';
export type { NavigationProps, NavigationItem } from './components/Navigation';

export { default as Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

// Hooks
export {
  useOnlineStatus,
  useAccessibility,
  useKeyboardNavigation,
  useFocusTrap,
  useMediaQuery,
  usePrefersReducedMotion,
  useDarkMode,
} from './hooks';

export type {
  OnlineStatus,
  AccessibilityContext,
  KeyboardHandler,
} from './hooks';

// Design Tokens
export { colors, typography, spacing, touchTargets } from './tokens';
