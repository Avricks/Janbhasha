# Janbhasha Android App

Offline-first mobile application for learning regional Indian languages with AI-powered personalized learning and inclusive design.

## Architecture

```
src/
├── screens/              # App screens (learner dashboard, lessons, assessment)
├── components/           # Screen-specific components
├── hooks/               # Custom React Native hooks
├── navigation/          # Navigation setup and stacks
├── services/            # API services, storage, sync
├── utils/               # Utilities and helpers
├── types/               # TypeScript type definitions
└── App.tsx              # Main app entry point
```

## Key Features

- **Offline-First**: Full offline support for learner content
- **Personalized Learning**: AI-powered adaptive learning paths
- **Accessibility**: WCAG 2.1 AA compliance for mobile
- **Regional Languages**: Support for Santhali, Mundari, and Ho
- **Low Bandwidth**: Optimized for < 2G networks
- **Inclusive Design**: Support for diverse learner backgrounds

## Screens

### Learner Dashboard
- Progress tracking with streaks
- Lesson cards (recent, recommended)
- Achievement badges
- Quick access to settings

### Lesson Player
- Lesson content with audio/transcript
- Navigation (next/previous lessons)
- Offline indicator
- Reading mode with font controls
- Speed control for audio

### Assessment Screen
- Multiple choice questions
- Progress tracking
- Instant feedback
- Navigation between questions
- Submit for grading

### Settings
- Language selection
- Proficiency level
- Dark mode toggle
- Offline storage management
- Account management

## Getting Started

### Prerequisites
- Node.js 16+
- React Native CLI
- Android Studio (for Android development)
- Java Development Kit (JDK) 11+

### Installation

```bash
# Install dependencies
npm install

# Install pods (if using iOS)
cd ios && pod install && cd ..

# Start development server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator
npm run ios
```

## Development

### Adding New Screens

1. Create screen component in `src/screens/`
2. Add screen type in `src/types/navigation.ts`
3. Add route to navigation stack in `src/navigation/`
4. Ensure all text strings use i18n for translation

### Accessibility Testing

```bash
# Run accessibility tests
npm run test:a11y

# Manual testing with screen reader
# On Android: Use TalkBack (Settings > Accessibility > TalkBack)
# On iOS: Use VoiceOver (Settings > Accessibility > VoiceOver)
```

### Performance Optimization

- Use React.memo for list items
- Lazy load screens with React.lazy
- Optimize images (use webp format)
- Minimize bundle size with tree-shaking

## Offline Support

All content is downloaded and stored locally using AsyncStorage and SQLite:

- Lessons are cached on first download
- Sync happens when connected to network
- Progress is tracked locally and synced

See `@janbhasha/offline` package for sync logic.

## Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm test -- --testPathPattern=integration
```

### E2E Tests
```bash
# Run on Android emulator
detox build-framework-cache
detox build-configuration android.sim.debug
detox test e2e --configuration android.sim.debug
```

## Build

### Debug APK
```bash
npm run android
# or
npm run build:apk -- --debug
```

### Release APK
```bash
npm run build:apk
```

### Android App Bundle (for Google Play)
```bash
npm run build:aab
```

## Deployment

### Prerequisites
- Google Play Developer Account
- Signing key (keystore)
- App signing certificate

### Steps

1. Generate signed APK/AAB
2. Upload to Google Play Console
3. Configure store listing
4. Publish to production

## Troubleshooting

### Port 8081 already in use
```bash
# Kill process using port 8081
lsof -ti :8081 | xargs kill -9
# On Windows: netstat -ano | findstr :8081
```

### Metro bundler issues
```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Android build errors
```bash
# Clean build
cd android && ./gradlew clean && cd ..
npm run build:apk
```

## Browser Compatibility

- Android 5.0+ (API 21+)
- iOS 12+

## Performance Targets

- App startup: < 3 seconds
- Screen navigation: < 500ms
- Content load: < 2 seconds (offline/online)
- List scroll: 60 FPS minimum

## Security

- All data encrypted at rest
- TLS 1.2+ for API communication
- Secure random token generation
- No sensitive data in logs

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md)

## License

MIT

---

**Status**: Active Development
**Last Updated**: 2026-08-31
