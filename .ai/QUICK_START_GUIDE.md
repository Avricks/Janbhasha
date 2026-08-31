# Janbhasha UI/UX Development Quick Start

**Last Updated**: 2026-08-31  
**Status**: Phase 2 Complete - Ready for Phase 3 Development

## Quick Links

- **UI Library**: `packages/ui/` - Accessible components library
- **Android App**: `apps/android/` - React Native learner app
- **Teacher Web**: `apps/teacher-web/` - Teacher portal (Vite + React)
- **Admin Web**: `apps/admin-web/` - Admin dashboard (Vite + React)

## Getting Started

### 1. Install and Build UI Library

```bash
# Navigate to UI library
cd packages/ui

# Install dependencies
npm install

# Build components
npm run build

# Watch mode for development
npm run dev
```

### 2. Using Components in Your App

```typescript
// Import from @janbhasha/ui
import Button from '@janbhasha/ui/Button';
import Input from '@janbhasha/ui/Input';
import Navigation from '@janbhasha/ui/Navigation';
import Modal from '@janbhasha/ui/Modal';
import OfflineIndicator from '@janbhasha/ui/OfflineIndicator';

// Import hooks
import { useOnlineStatus, useAccessibility, useFocusTrap } from '@janbhasha/ui';

// Use components
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
/>

<Navigation
  items={navItems}
  variant="horizontal"
  theme="dark"
/>

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Dialog Title"
>
  Modal content here
</Modal>
```

### 3. Android App Development

```bash
# Navigate to Android app
cd apps/android

# Install dependencies
npm install

# Start React Native Metro bundler
npm start

# Run on emulator/device
npm run android

# Run tests
npm run test
```

### 4. Web Apps Development

```bash
# Teacher portal
cd apps/teacher-web
npm install
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build
npm run test       # Run tests

# Admin dashboard
cd apps/admin-web
npm install
npm run dev        # Start dev server
npm run build      # Production build
npm run test       # Run tests
```

## Component Documentation

### Button Component

```typescript
import Button from '@janbhasha/ui/Button';

// Basic usage
<Button variant="primary" size="md">
  Primary Button
</Button>

// With icon
<Button icon={<SearchIcon />} size="lg">
  Search
</Button>

// Loading state
<Button loading>
  Saving...
</Button>

// All variants
<Button variant="primary">Primary</Button>     // Main action
<Button variant="secondary">Secondary</Button> // Alternative action
<Button variant="danger">Danger</Button>       // Destructive action
<Button variant="ghost">Ghost</Button>         // Low emphasis

// All sizes
<Button size="sm">Small</Button>        // 32px
<Button size="md">Medium</Button>       // 40px (default)
<Button size="lg">Large</Button>        // 48px
```

**Accessibility Features**:
- Minimum 48×48px touch targets
- Keyboard navigation (Tab, Enter, Space)
- Screen reader compatible
- Clear focus indicators
- ARIA labels for icon-only buttons

### Input Component

```typescript
import Input from '@janbhasha/ui/Input';

// Basic usage
<Input
  label="Full Name"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// With validation
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!isValidEmail(email) ? "Invalid email" : undefined}
  required
/>

// With hint text
<Input
  label="Password"
  type="password"
  hint="Minimum 8 characters, 1 uppercase, 1 number"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

// Success state
<Input
  label="Username"
  value={username}
  success={isUsernameAvailable}
/>
```

**Accessibility Features**:
- Always-visible labels
- Clear error messages with role="alert"
- Hint text associated via aria-describedby
- 48px minimum height
- Mobile-optimized (16px prevents iOS zoom)
- Clear focus indicators

### Navigation Component

```typescript
import Navigation from '@janbhasha/ui/Navigation';

const navItems = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <HomeIcon />,
  },
  {
    id: 'lessons',
    label: 'Lessons',
    children: [
      { id: 'lesson-1', label: 'Lesson 1' },
      { id: 'lesson-2', label: 'Lesson 2' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    badge: 3, // Shows notification badge
    icon: <SettingsIcon />,
  },
];

<Navigation
  items={navItems}
  variant="horizontal"  // or "vertical"
  activeItemId="home"
  onItemClick={(itemId) => console.log(itemId)}
  theme="light"         // or "dark"
/>
```

**Accessibility Features**:
- Keyboard navigation (Arrow keys, Enter, Escape)
- ARIA menubar support
- Badge descriptions for screen readers
- Mobile hamburger menu
- Focus management
- Submenu support with visual indicators

### Modal Component

```typescript
import Modal from '@janbhasha/ui/Modal';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Dialog Title"
  size="md"  // "sm", "md", "lg"
  isDismissible={true}
  role="dialog"  // or "alertdialog"
>
  Modal content goes here
  
  <p>Your content here</p>
</Modal>

// With actions
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  actions={
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  }
>
  Are you sure?
</Modal>
```

**Accessibility Features**:
- Focus trap within modal
- Escape key to close
- ARIA modal attributes
- Backdrop click to dismiss
- Screen reader announcements
- Keyboard navigation support

### OfflineIndicator Component

```typescript
import { OfflineIndicator, useOnlineStatus } from '@janbhasha/ui';

export function MyApp() {
  const { isOnline, syncInProgress, syncProgress } = useOnlineStatus();

  return (
    <>
      <OfflineIndicator
        isOnline={isOnline}
        syncInProgress={syncInProgress}
        syncProgress={syncProgress}
        position="top"     // "top" or "bottom"
        theme="light"      // "light" or "dark"
        autoHideDuration={3000}  // ms
      />
      
      {/* Your app content */}
    </>
  );
}
```

**Accessibility Features**:
- aria-live announcements
- Progress bar with ARIA attributes
- Clear status messages
- Non-intrusive positioning

## Custom Hooks

### useOnlineStatus

```typescript
const { isOnline, syncInProgress, syncProgress, error } = useOnlineStatus();

// Returns:
// - isOnline: boolean (navigator.onLine)
// - syncInProgress: boolean
// - syncProgress: number (0-100)
// - error?: Error
```

### useAccessibility

```typescript
const { restoreFocus, setFocus } = useAccessibility();

// Use for modal workflows
const modalRef = useRef(null);
useAccessibility.restoreFocus();  // Restore focus after modal closes
```

### useKeyboardNavigation

```typescript
useKeyboardNavigation({
  'ctrl+k': () => openSearch(),
  'escape': () => closeModal(),
  'ctrl+s': () => saveChanges(),
});
```

### useFocusTrap

```typescript
const modalRef = useRef(null);
useFocusTrap(modalRef, isModalOpen);
// Automatically traps focus within element when isModalOpen is true
```

### useMediaQuery

```typescript
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
```

### useDarkMode

```typescript
const isDarkMode = useDarkMode();
// Detects system preference and watches for changes
```

### usePrefersReducedMotion

```typescript
const prefersReducedMotion = usePrefersReducedMotion();
// Respects user's motion preferences
```

## Testing Components

### Unit Testing

```typescript
// components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from '@janbhasha/ui/Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Accessibility Testing

```typescript
// components/Button.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '@janbhasha/ui/Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click Me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Design Tokens

All components use CSS variables for theming:

```css
/* Light mode (default) */
--color-primary: #0EA5E9;
--color-success: #22C55E;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-bg: #FFFFFF;
--color-text-primary: #111827;
--color-text-secondary: #6B7280;
--color-border: #E5E7EB;

/* Dark mode */
@media (prefers-color-scheme: dark) {
  --color-bg: #1F2937;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #D1D5DB;
  --color-border: #374151;
}
```

## Building New Components

### Template

```typescript
import React, { forwardRef } from 'react';
import './MyComponent.css';

export interface MyComponentProps {
  children: React.ReactNode;
  className?: string;
  // Add your props
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`my-component ${className}`}
        role="region"  // Semantic role
        aria-label="Descriptive label"  // Screen reader text
        {...props}
      >
        {children}
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';

export default MyComponent;
```

## Resources

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring**: https://www.w3.org/WAI/ARIA/apg/
- **Government Specs**: `.ai/GOVERNMENT_SPECIFICATIONS.md`
- **UI Guide**: `.ai/UI_IMPLEMENTATION_GUIDE.md`
- **Design System**: `packages/ui/DESIGN_SYSTEM.md`

## Common Tasks

### Adding a New Component

1. Create directory: `packages/ui/src/components/MyComponent/`
2. Create files:
   - `MyComponent.tsx` (React component)
   - `MyComponent.css` (Styles)
   - `index.ts` (Exports)
3. Add to `packages/ui/src/index.ts` exports
4. Create tests in `MyComponent.test.tsx`
5. Add a11y tests in `MyComponent.a11y.test.tsx`
6. Document in `packages/ui/README.md`

### Implementing a New Screen

1. Create file: `apps/android/src/screens/MyScreen.tsx`
2. Use components from `@janbhasha/ui`
3. Import hooks for accessibility
4. Implement accessibility best practices
5. Test with screen readers
6. Add to navigation stack
7. Document in `apps/android/README.md`

### Testing Accessibility

```bash
# Run a11y tests
npm run test:a11y

# Manual testing
# Android: Enable TalkBack (Settings > Accessibility)
# iOS: Enable VoiceOver (Settings > Accessibility)
# Web: Use screen reader (NVDA, JAWS, VoiceOver)
```

## Troubleshooting

### Component not rendering
- Check imports: `import Button from '@janbhasha/ui/Button'`
- Ensure @janbhasha/ui is built: `npm run build` in packages/ui

### Accessibility issues
- Run axe: `npm run test:a11y`
- Manual screen reader test
- Check ARIA labels on interactive elements

### Styling issues
- Ensure CSS variables are available
- Check dark mode detection
- Verify breakpoint for responsive design

### Build errors
- Clear cache: `npm run clean && npm install`
- Check TypeScript: `npm run type-check`
- Verify all imports

## Next Steps

1. **Phase 3 Development**:
   - Create Settings screen for Android
   - Create Assessment screen for Android
   - Implement Teacher portal screens
   - Implement Admin dashboard screens

2. **Testing Infrastructure**:
   - Setup Storybook
   - Create component documentation
   - Setup CI/CD testing

3. **Deployment**:
   - Build Android APK/AAB
   - Deploy web apps
   - Setup monitoring and analytics

---

**For questions or issues**: Refer to component documentation or government specifications
