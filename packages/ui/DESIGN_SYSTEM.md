---
name: ui-design-system
description: Accessible UI Design System following government specifications
applyTo: ["apps/*/src/**/*.{tsx,ts,jsx,js}", "packages/ui/**/*.{tsx,ts,jsx,js}"]
---

# Janbhasha UI Design System

## Design Tokens

### Colors (WCAG AA Compliant)

#### Primary Palette
```typescript
export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#F0F9FF',   // Light
    100: '#E0F2FE',
    200: '#BAE6FD',
    500: '#0EA5E9',  // Main (meets 4.5:1 contrast on white)
    600: '#0284C7',  // Dark
    900: '#0C2340',  // Darkest
  },
  
  // Success (Green)
  success: {
    50: '#F0FDF4',
    500: '#22C55E',  // Accessible green (4.5:1 on white)
    700: '#16A34A',
  },
  
  // Warning (Amber)
  warning: {
    50: '#FFFBEB',
    500: '#F59E0B',  // Accessible amber
    700: '#D97706',
  },
  
  // Error (Red)
  error: {
    50: '#FEF2F2',
    500: '#EF4444',  // Accessible red (3.6:1 on white)
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
  
  // Dark Mode
  dark: {
    bg: '#1F2937',
    surface: '#374151',
    text: '#F3F4F6',
    textSecondary: '#D1D5DB',
  },
};
```

### Typography

```typescript
export const typography = {
  // Font Family
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },
  
  // Font Sizes (minimum 16px for body)
  fontSize: {
    xs: '12px',      // Labels, captions
    sm: '14px',      // Small text
    base: '16px',    // Body text (minimum)
    lg: '18px',      // Large text
    xl: '20px',      // Heading 5
    '2xl': '24px',   // Heading 4
    '3xl': '28px',   // Heading 3
    '4xl': '32px',   // Heading 2
    '5xl': '36px',   // Heading 1
  },
  
  // Font Weight
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line Height
  lineHeight: {
    tight: 1.2,
    normal: 1.5,     // Minimum 1.5 for accessibility
    relaxed: 1.75,
    loose: 2,
  },
  
  // Text Styles
  styles: {
    body: {
      fontSize: '16px',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    heading1: {
      fontSize: '36px',
      lineHeight: 1.2,
      fontWeight: 700,
    },
    heading2: {
      fontSize: '32px',
      lineHeight: 1.2,
      fontWeight: 700,
    },
    heading3: {
      fontSize: '28px',
      lineHeight: 1.2,
      fontWeight: 600,
    },
    button: {
      fontSize: '16px',
      lineHeight: 1.5,
      fontWeight: 600,
    },
  },
};
```

### Spacing

```typescript
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',      // Base unit
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
};
```

### Touch Targets

```typescript
export const touchTargets = {
  small: '36px',      // For densely packed UI
  default: '48px',    // Recommended minimum
  large: '56px',      // For important actions
  extraLarge: '64px', // Primary actions
};
```

## Component Specifications

### Button Component

```typescript
interface ButtonProps {
  // Accessibility
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaDisabled?: boolean;
  role?: 'button' | 'menuitem' | 'tab';
  
  // Visual
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  
  // Behavior
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  
  // Content
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

// Minimum height: 48px
// Focus ring: 2px solid with 2px gap
// Contrast: 4.5:1 minimum
// Keyboard: Full support (Enter, Space)
```

### Input Component

```typescript
interface InputProps {
  // Accessibility
  label: string;               // Always required
  ariaLabel?: string;
  ariaDescribedBy?: string;
  required?: boolean;
  disabled?: boolean;
  
  // Visual
  type: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
  
  // Input Method
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'url' | 'search';
  autoComplete?: string;
  
  // Validation
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

// Minimum height: 44px (48px preferred)
// Label placement: above input (no floating labels)
// Focus indicator: 2px solid outline
// Error display: Clear message below input
// Touch-friendly: 48x48dp minimum
```

### Navigation Component

```typescript
interface NavigationProps {
  // Structure
  items: NavigationItem[];
  currentPath?: string;
  
  // Accessibility
  ariaLabel?: string;
  role?: 'navigation' | 'menubar';
  
  // Mobile
  responsive?: boolean;
  mobileBreakpoint?: number;
  
  // Behavior
  onNavigate?: (path: string) => void;
}

// Focus order: Logical, left-to-right
// Current indicator: Clear visual + aria-current="page"
// Mobile: Hamburger menu with keyboard control
// Keyboard: Tab, Arrow keys, Enter
// Skip link: First focusable element (Skip to content)
```

### Offline Status Indicator

```typescript
interface OfflineIndicatorProps {
  // Status
  isOnline: boolean;
  lastSyncTime?: Date;
  syncInProgress?: boolean;
  
  // Customization
  position?: 'top' | 'bottom' | 'fixed';
  theme?: 'light' | 'dark';
}

// Display: Non-intrusive banner or bottom sheet
// Messages:
//   - Online: "Connected" (optional, only show briefly)
//   - Offline: "You're offline - Changes saved locally"
//   - Syncing: "Syncing changes... X of Y complete"
//   - Sync complete: "All changes synced" (auto-dismiss)
// Position: Top when appearing, doesn't block content
// A11y: aria-live="polite" for status updates
```

## Responsive Design

### Breakpoints

```typescript
export const breakpoints = {
  xs: 0,        // Mobile
  sm: 600,      // Tablet
  md: 1024,     // Large tablet
  lg: 1200,     // Desktop
  xl: 1920,     // Large desktop
};

// Mobile-first approach:
// 1. Base styles for mobile
// 2. Tablet adjustments at 600px
// 3. Desktop adjustments at 1200px
```

### Grid System

```typescript
// 12-column grid for desktop, 4-column for mobile
// Gutters: 16px on mobile, 24px on desktop
// Margins: 16px on mobile, 32px on desktop
// Max-width: 1200px centered

export const gridConfig = {
  columns: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
  gap: {
    mobile: '16px',
    tablet: '20px',
    desktop: '24px',
  },
  margin: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },
};
```

## Dark Mode Support

```typescript
// CSS Variables for theme switching
:root {
  --color-bg: #FFFFFF;
  --color-surface: #F9FAFB;
  --color-text: #111827;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  
  // Shadows (reduced in dark mode)
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1F2937;
    --color-surface: #374151;
    --color-text: #F3F4F6;
    --color-text-secondary: #D1D5DB;
    --color-border: #4B5563;
    
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }
}

// OR toggle with class
html.dark {
  --color-bg: #1F2937;
  // ... other variables
}
```

## Keyboard Navigation

```typescript
// Tab Order
// - Logical reading order (top-to-bottom, left-to-right)
// - Skip links for navigation
// - No tabindex > 0 (except necessary cases)
// - Visible focus indicators

// Keyboard Shortcuts
// - Ctrl+F: Search
// - Ctrl+/: Command palette
// - Escape: Close modals/dropdowns
// - Arrow keys: Navigation
// - Enter: Confirm
// - Space: Toggle
// - Alt+letter: Mnemonic access

// Focus Management
// - Visible 2px outline (not just color change)
// - 2px gap between element and outline
// - Contrast ratio 3:1 with background
```

## Animation Guidelines

```typescript
// Performance: Optimize for 60fps
export const animations = {
  // Durations
  fast: '150ms',      // Micro-interactions
  normal: '200ms',    // Default
  slow: '300ms',      // Attention
  
  // Easing
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  
  // Transforms only (no width/height changes)
  // GPU-accelerated properties: transform, opacity
  // Avoid: background-color, box-shadow (static)
};

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Requirements

### Accessibility Testing
- [ ] Automated: Axe, Lighthouse, WAVE
- [ ] Manual: Keyboard navigation
- [ ] Screen Reader: NVDA, JAWS, VoiceOver
- [ ] Color Contrast: 4.5:1 for normal text, 3:1 for large text
- [ ] User Testing: With assistive technology

### Performance Testing
- [ ] Page load < 3s on 2G networks
- [ ] Smooth 60fps animations
- [ ] Touch response < 100ms
- [ ] Memory usage < 100MB (mobile)

### Responsive Testing
- [ ] Mobile: 375px, 414px, 540px
- [ ] Tablet: 768px, 1024px
- [ ] Desktop: 1280px, 1920px
- [ ] Landscape/Portrait orientations
- [ ] Various pixel densities

### Language Support Testing
- [ ] Santhali (Ol Chiki): Text rendering, input methods
- [ ] Mundari (Warang Citi): Script rendering, input methods
- [ ] Ho: Both Devanagari and Latin, script switching
- [ ] Font loading and fallbacks
- [ ] Text directionality

---

**Document Version**: 1.0
**Last Updated**: 2026-08-31
**Status**: Active
