/**
 * useOnlineStatus Hook
 * Tracks network connectivity and sync status
 */

import { useEffect, useState, useCallback } from 'react';

export interface OnlineStatus {
  isOnline: boolean;
  lastSyncTime?: Date;
  syncInProgress: boolean;
  syncProgress: number;
  error?: string;
}

export const useOnlineStatus = (): OnlineStatus => {
  const [status, setStatus] = useState<OnlineStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    syncInProgress: false,
    syncProgress: 0,
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: true,
      }));
    };

    const handleOffline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: false,
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const setSyncInProgress = useCallback((inProgress: boolean) => {
    setStatus(prev => ({
      ...prev,
      syncInProgress: inProgress,
      syncProgress: inProgress ? 0 : 100,
      lastSyncTime: inProgress ? prev.lastSyncTime : new Date(),
    }));
  }, []);

  const setSyncProgress = useCallback((progress: number) => {
    setStatus(prev => ({
      ...prev,
      syncProgress: Math.min(100, Math.max(0, progress)),
    }));
  }, []);

  const setSyncError = useCallback((error?: string) => {
    setStatus(prev => ({
      ...prev,
      error,
    }));
  }, []);

  return status;
};

/**
 * useAccessibility Hook
 * Manages focus and keyboard navigation
 */

export interface AccessibilityContext {
  lastFocusedElement: HTMLElement | null;
  restoreFocus: () => void;
  setFocus: (element: HTMLElement | null) => void;
}

export const useAccessibility = (): AccessibilityContext => {
  const [lastFocusedElement, setLastFocusedElement] = useState<HTMLElement | null>(null);

  const restoreFocus = useCallback(() => {
    if (lastFocusedElement && document.body.contains(lastFocusedElement)) {
      lastFocusedElement.focus();
    }
  }, [lastFocusedElement]);

  const setFocus = useCallback((element: HTMLElement | null) => {
    if (element) {
      setLastFocusedElement(document.activeElement as HTMLElement);
      element.focus();
    }
  }, []);

  return {
    lastFocusedElement,
    restoreFocus,
    setFocus,
  };
};

/**
 * useKeyboardNavigation Hook
 * Handles keyboard shortcuts and navigation
 */

export interface KeyboardHandler {
  (event: KeyboardEvent): void | boolean;
}

export const useKeyboardNavigation = (handlers: Record<string, KeyboardHandler>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Build key identifier
      const key = [
        event.ctrlKey && 'ctrl',
        event.altKey && 'alt',
        event.shiftKey && 'shift',
        event.key.toLowerCase(),
      ]
        .filter(Boolean)
        .join('+');

      if (handlers[key]) {
        const result = handlers[key](event);
        if (result === false) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
};

/**
 * useFocusTrap Hook
 * Traps focus within a specific element (modals, etc.)
 */

export const useFocusTrap = (
  containerRef: React.RefObject<HTMLElement>,
  isActive = true
) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, isActive]);
};

/**
 * useMediaQuery Hook
 * Detects media queries for responsive design
 */

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

/**
 * usePrefersReducedMotion Hook
 * Detects user's motion preferences
 */

export const usePrefersReducedMotion = (): boolean => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

/**
 * useDarkMode Hook
 * Detects and manages dark mode preference
 */

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isDarkMode;
};
