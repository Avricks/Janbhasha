# Janbhasha UI/UX Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing the improved UI/UX experience across all Janbhasha applications (Android, Teacher Web, Admin Web) following government specifications and accessibility standards.

## Phase 1: Component Library Foundation

### Created Components

#### 1. **Button Component** (`packages/ui/src/components/Button/`)
- Accessible button with 48x48px minimum touch target
- Multiple variants: primary, secondary, danger, ghost
- Sizes: sm, md, lg
- Full keyboard support with visible focus indicators
- Loading and disabled states
- Icon support with positioning

**Features**:
- ✅ WCAG 2.1 AA compliant (4.5:1 contrast)
- ✅ 2px focus outline with 2px gap
- ✅ Semantic HTML
- ✅ Mobile-optimized
- ✅ Dark mode support
- ✅ Reduced motion support

**Usage**:
```tsx
import Button from '@janbhasha/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

<Button loading>Saving...</Button>
```

#### 2. **Input Component** (`packages/ui/src/components/Input/`)
- Always-visible labels (no floating labels)
- Clear validation feedback (error/success states)
- Minimum 48px height
- Proper label-to-input association
- Error messages with solutions
- Hint text support

**Features**:
- ✅ WCAG 2.1 AA compliant
- ✅ Semantic labeling (label→input)
- ✅ Error alerts with role="alert"
- ✅ Clear focus indicators
- ✅ Mobile-friendly input modes
- ✅ Autofill styling
- ✅ Dark mode support

**Usage**:
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

#### 3. **Offline Indicator Component** (`packages/ui/src/components/OfflineIndicator/`)
- Non-intrusive status banner
- Clear offline/online messaging
- Sync progress indication
- Auto-hide on successful sync
- Accessible status updates (aria-live)

**Features**:
- ✅ Polite aria-live announcements
- ✅ Progress bar for sync operations
- ✅ Automatic animation
- ✅ Fixed/sticky positioning
- ✅ Support for top/bottom placement
- ✅ Dark mode support
- ✅ Reduced motion support

**Usage**:
```tsx
import OfflineIndicator from '@janbhasha/ui/OfflineIndicator';

const [isOnline, setIsOnline] = useState(navigator.onLine);

<OfflineIndicator 
  isOnline={isOnline} 
  syncInProgress={syncing}
  syncProgress={syncProgress}
/>
```

### Custom Hooks (`packages/ui/src/hooks/`)

#### useOnlineStatus
Tracks connectivity and sync status

```tsx
const { isOnline, syncInProgress, syncProgress } = useOnlineStatus();
```

#### useAccessibility
Manages focus and keyboard navigation

```tsx
const { restoreFocus, setFocus } = useAccessibility();
```

#### useKeyboardNavigation
Handles keyboard shortcuts

```tsx
useKeyboardNavigation({
  'ctrl+k': handleSearch,
  'ctrl+/': handleHelp,
  'escape': handleClose,
});
```

#### useFocusTrap
Traps focus within modals/dialogs

```tsx
useFocusTrap(modalRef, isOpen);
```

#### useMediaQuery
Responsive design detection

```tsx
const isMobile = useMediaQuery('(max-width: 600px)');
const isDarkMode = useDarkMode();
```

## Phase 2: Application-Specific UI

### 2.1 Learner Interface (Android App)

#### Screen Structure

```
LearnerDashboard
├── OfflineIndicator (top)
├── Header
│   ├── App logo
│   └── Profile/Settings menu
├── MainContent
│   ├── ProgressCard
│   │   ├── Streak indicator
│   │   ├── Level/proficiency
│   │   └── Today's lessons remaining
│   ├── CurrentLessonCard
│   │   ├── Lesson title
│   │   ├── Language level (A0-B1)
│   │   ├── Duration estimate
│   │   └── Start button
│   └── RecommendedLessons
│       └── Horizontal scrolling lessons
├── Navigation (bottom)
│   ├── Dashboard
│   ├── Lessons
│   ├── Assessments
│   ├── Achievements
│   └── Settings
└── FastAction
    └── Search (Ctrl+F)
```

**Accessibility Requirements**:
- All interactive elements ≥ 48x48dp
- Clear focus indicators for keyboard navigation
- Screen reader support with proper ARIA labels
- Language-specific font rendering
- Support for Santhali, Mundari, Ho scripts

#### Key Screens

1. **Onboarding Screen**
   - Language selection with flags/names
   - Proficiency level assessment
   - Quick feature tour
   - Permission requests

2. **Lesson Player**
   - Large, readable text (≥ 16px)
   - Audio playback controls
   - Transcript display
   - Offline availability indicator
   - Navigation: Previous/Next/Exit

3. **Assessment Screen**
   - Clear question display
   - Easy answer selection
   - Progress indicator
   - Immediate feedback
   - Offline submission (sync when online)

4. **Settings Screen**
   - Language selection
   - Proficiency level adjustment
   - Notification preferences
   - Data management
   - Help and support

### 2.2 Teacher Portal (Web)

#### Layout Structure

```
TeacherPortal
├── Sidebar Navigation
│   ├── Dashboard
│   ├── Content Management
│   ├── Class Management
│   ├── Assessments
│   └── Analytics
├── Header
│   ├── Search
│   ├── Notifications
│   └── Profile
└── MainContent
    └── [Page-specific content]
```

**Accessibility Requirements**:
- Keyboard-only navigation support
- Skip links for main content
- WCAG 2.1 AA compliance
- Responsive design (mobile to desktop)
- Dark mode support

#### Key Features

1. **Content Management**
   - Create/edit lessons
   - Upload resources
   - Manage multimedia
   - Version control
   - Preview before publishing

2. **Class Management**
   - Student roster
   - Assignment distribution
   - Progress tracking
   - Attendance management

3. **Analytics Dashboard**
   - Student performance charts
   - Engagement metrics
   - Time spent analysis
   - Skill progression

### 2.3 Admin Dashboard (Web)

#### Layout Structure

```
AdminDashboard
├── Sidebar
│   ├── User Management
│   ├── Content Moderation
│   ├── Analytics
│   ├── System Settings
│   └── Reports
├── Header
│   ├── System Health
│   ├── Alerts
│   └── Admin Profile
└── MainContent
    └── [Admin-specific content]
```

**Key Features**:
- User role and permission management
- Content approval workflows
- System performance monitoring
- Analytics and reporting
- Backup and data management

## Phase 3: Implementation Checklist

### Step 1: Setup Project Structure
- [ ] Create UI package with component library
- [ ] Setup TypeScript configuration
- [ ] Configure CSS modules/styling system
- [ ] Setup Storybook for component development
- [ ] Create design tokens file

### Step 2: Implement Core Components
- [ ] Button component (all variants)
- [ ] Input component (with validation)
- [ ] Navigation component
- [ ] Offline indicator
- [ ] Modal/dialog
- [ ] Toast notifications
- [ ] Loading spinners
- [ ] Error boundaries

### Step 3: Implement Custom Hooks
- [ ] useOnlineStatus hook
- [ ] useAccessibility hook
- [ ] useKeyboardNavigation hook
- [ ] useFocusTrap hook
- [ ] useMediaQuery hook
- [ ] useDarkMode hook

### Step 4: Android App Development
- [ ] Setup React Native project
- [ ] Implement learner dashboard screen
- [ ] Implement lesson player
- [ ] Implement assessment screen
- [ ] Implement offline sync
- [ ] Setup language-specific rendering
- [ ] Add speech recognition/synthesis

### Step 5: Teacher Portal Development
- [ ] Setup Next.js or React app
- [ ] Implement dashboard
- [ ] Implement content management
- [ ] Implement class management
- [ ] Add analytics visualization

### Step 6: Admin Dashboard Development
- [ ] Setup admin dashboard
- [ ] Implement user management
- [ ] Implement content moderation
- [ ] Add system monitoring

### Step 7: Testing
- [ ] Accessibility testing (WCAG 2.1 AA)
- [ ] Performance testing (< 3s load time)
- [ ] Device testing (various Android versions)
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Offline functionality testing
- [ ] Language rendering testing

### Step 8: Optimization
- [ ] Performance optimization
- [ ] Code splitting
- [ ] Image optimization
- [ ] Network optimization
- [ ] Battery optimization (mobile)

### Step 9: Launch & Monitoring
- [ ] Final accessibility audit
- [ ] Performance monitoring setup
- [ ] Analytics tracking
- [ ] Feedback collection
- [ ] Continuous improvements

## Design Tokens

### Colors (WCAG AA Compliant)
```css
--primary: #0EA5E9        /* 4.5:1 contrast on white */
--success: #22C55E        /* Accessible green */
--warning: #F59E0B        /* Accessible amber */
--error: #EF4444          /* Accessible red */
--text-dark: #111827
--text-light: #FFFFFF
--bg-light: #FFFFFF
--bg-dark: #1F2937
```

### Typography
```css
--font-base: 16px         /* Minimum for body text */
--font-line-height: 1.5   /* Minimum */
--font-weight-normal: 400
--font-weight-bold: 700
```

### Spacing (8px Grid)
```css
--space-1: 4px
--space-2: 8px   /* Base unit */
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
```

### Touch Targets
```css
--touch-min: 48px
--touch-preferred: 56px
```

## Testing Strategy

### Automated Testing
```bash
# Accessibility scanning
npm run test:a11y

# Performance testing
npm run test:performance

# Unit tests
npm run test:unit

# Integration tests
npm run test:integration
```

### Manual Testing Checklist
- [ ] Keyboard-only navigation
- [ ] Screen reader (NVDA, JAWS)
- [ ] Color contrast verification
- [ ] Mobile device testing
- [ ] Low-bandwidth testing
- [ ] Offline functionality
- [ ] Language rendering

### User Testing
- [ ] Test with target learners
- [ ] Test with teachers
- [ ] Feedback collection
- [ ] Usability improvements

## Performance Targets

- **Page Load**: < 3s on 2G networks
- **Time to Interactive**: < 5s
- **Animation**: 60 FPS
- **Memory**: < 100MB (mobile)
- **Data Usage**: < 1MB per session

## Accessibility Standards

- **WCAG 2.1**: Level AA compliance
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Touch Targets**: Minimum 48x48dp
- **Focus Indicators**: Visible 2px outline with 2px gap
- **Keyboard Navigation**: Full support
- **Screen Readers**: Compatible with NVDA, JAWS, VoiceOver

## Compliance Checklist

- [ ] WCAG 2.1 AA compliance verified
- [ ] SWAYAM course structure implemented
- [ ] DIKSHA metadata compliance
- [ ] Government accessibility standards met
- [ ] Language support verified (Santhali, Mundari, Ho)
- [ ] Offline-first functionality implemented
- [ ] Performance optimization completed
- [ ] Security review passed
- [ ] Data privacy verified
- [ ] User testing completed

---

**Last Updated**: 2026-08-31
**Status**: Implementation In Progress
