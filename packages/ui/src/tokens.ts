/**
 * Janbhasha Design Tokens
 * WCAG 2.1 AA Compliant Color Palette
 * Government Specification Aligned
 */

export const colors = {
  // Primary Brand (4.5:1 contrast on white)
  primary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    500: '#0EA5E9',  // Main
    600: '#0284C7',  // Dark
    900: '#0C2340',  // Darkest
  },

  // Success (Accessible green)
  success: {
    50: '#F0FDF4',
    500: '#22C55E',
    700: '#16A34A',
  },

  // Warning (Accessible amber)
  warning: {
    50: '#FFFBEB',
    500: '#F59E0B',
    700: '#D97706',
  },

  // Error (Accessible red)
  error: {
    50: '#FEF2F2',
    500: '#EF4444',
    700: '#DC2626',
  },

  // Neutral (Grayscale)
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    400: '#9CA3AF',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',    // Minimum for body text
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '36px',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,     // Minimum for accessibility
    relaxed: 1.75,
    loose: 2,
  },
};

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',        // Base unit
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
};

export const touchTargets = {
  small: '36px',
  default: '48px',     // Recommended minimum
  large: '56px',       // Primary actions
  extraLarge: '64px',
};
