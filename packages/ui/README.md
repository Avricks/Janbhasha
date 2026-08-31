# Janbhasha UI Component Library

Accessible, WCAG 2.1 AA compliant UI component library following government specifications (SWAYAM, DIKSHA) and best practices for inclusive design.

## Features

- ✅ **WCAG 2.1 AA Compliance**: All components meet accessibility standards
- ✅ **Government Compliance**: Follows SWAYAM and DIKSHA guidelines
- ✅ **Mobile-First**: Designed for low-bandwidth and low-end devices
- ✅ **Inclusive Design**: Support for diverse user backgrounds and tech literacy
- ✅ **Offline-Ready**: Components support offline-first functionality
- ✅ **Dark Mode**: Built-in dark mode support
- ✅ **Type-Safe**: Full TypeScript support

## Components

### Button
Accessible button component with multiple variants.

```tsx
import Button from '@janbhasha/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

<Button icon={<SearchIcon />} ariaLabel="Search">
  Search
</Button>

<Button loading>Saving...</Button>
```

**Props**:
- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `icon`: ReactNode
- `iconPosition`: 'left' | 'right'
- `ariaLabel`: string

**Accessibility**:
- Minimum 48x48px touch target
- Visible focus indicator (2px outline)
- Full keyboard support
- ARIA labels for icon-only buttons

### Input
Form input with validation feedback.

```tsx
import Input from '@janbhasha/ui/Input';

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  hint="We'll never share your email"
/>
```

**Props**:
- `label`: string (required)
- `type`: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url'
- `value`: string
- `onChange`: (value: string) => void
- `error`: string
- `success`: boolean
- `hint`: string
- `inputMode`: 'text' | 'numeric' | 'tel' | 'email' | 'url' | 'search'
- `disabled`: boolean
- `required`: boolean

**Accessibility**:
- Always-visible label (no floating labels)
- Clear error messages with role="alert"
- Hint text with proper association
- Minimum 48px height
- Clear focus indicators
- Mobile-optimized input methods

### OfflineIndicator
Network status indicator component.

```tsx
import OfflineIndicator from '@janbhasha/ui/OfflineIndicator';

<OfflineIndicator 
  isOnline={isOnline} 
  syncInProgress={syncing}
  syncProgress={syncProgress}
/>
```

**Props**:
- `isOnline`: boolean
- `lastSyncTime`: Date
- `syncInProgress`: boolean
- `syncProgress`: number (0-100)
- `position`: 'top' | 'bottom'
- `theme`: 'light' | 'dark'
- `autoHideDuration`: number (ms)

**Accessibility**:
- Polite aria-live announcements
- Progress bar with ARIA attributes
- Non-intrusive design

## Hooks

### useOnlineStatus
Tracks network connectivity and sync status.

```tsx
const { isOnline, syncInProgress, syncProgress, error } = useOnlineStatus();
```

### useAccessibility
Manages focus and keyboard navigation.

```tsx
const { restoreFocus, setFocus } = useAccessibility();
```

### useKeyboardNavigation
Handles keyboard shortcuts.

```tsx
useKeyboardNavigation({
  'ctrl+k': handleSearch,
  'ctrl+/': handleHelp,
  'escape': handleClose,
});
```

### useFocusTrap
Traps focus within modals/dialogs.

```tsx
useFocusTrap(modalRef, isOpen);
```

### useMediaQuery
Detects media queries.

```tsx
const isMobile = useMediaQuery('(max-width: 600px)');
```

### useDarkMode
Detects dark mode preference.

```tsx
const isDarkMode = useDarkMode();
```

### usePrefersReducedMotion
Detects motion preferences.

```tsx
const prefersReducedMotion = usePrefersReducedMotion();
```

## Design Tokens

### Colors (WCAG AA Compliant)
```typescript
colors.primary.500      // #0EA5E9 (4.5:1 contrast on white)
colors.success.500      // #22C55E
colors.warning.500      // #F59E0B
colors.error.500        // #EF4444
colors.neutral.900      // #111827 (text)
colors.neutral.0        // #FFFFFF (background)
```

### Typography
```typescript
typography.fontSize.base      // 16px (minimum for body)
typography.lineHeight.normal  // 1.5 (minimum)
typography.fontWeight.bold    // 700
```

### Spacing (8px Grid)
```typescript
spacing[2]    // 8px (base unit)
spacing[4]    // 16px
spacing[6]    // 24px
spacing[8]    // 32px
```

### Touch Targets
```typescript
touchTargets.default      // 48px (recommended minimum)
touchTargets.large        // 56px
touchTargets.extraLarge   // 64px
```

## Testing

### Unit Tests
```bash
npm run test
```

### Accessibility Tests
```bash
npm run test:a11y
```

### Storybook
```bash
npm run storybook
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Android 5.0+

## Accessibility Standards

- **WCAG 2.1**: Level AA compliance
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Touch Targets**: Minimum 48x48px
- **Focus Indicators**: Visible 2px outline with 2px gap
- **Keyboard Navigation**: Full support
- **Screen Readers**: Compatible with NVDA, JAWS, VoiceOver

## Dark Mode Support

All components automatically support dark mode via CSS variables. Users' system preferences are detected and applied.

```tsx
@media (prefers-color-scheme: dark) {
  /* Dark mode styles automatically applied */
}
```

## Internationalization

Components support multiple languages via proper markup and props:

```tsx
<Button ariaLabel="खोज करें">
  खोजें
</Button>
```

Language-specific fonts and text rendering for Santhali, Mundari, and Ho supported through CSS font-loading.

## Performance

- Optimized for low-bandwidth networks
- Lazy loading support
- Code splitting friendly
- Minimal dependencies
- < 20KB gzipped (core components)

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT

---

**Version**: 1.0.0
**Status**: Active Development
**Last Updated**: 2026-08-31
