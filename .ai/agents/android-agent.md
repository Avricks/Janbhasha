---
name: Android Agent
focus: Mobile application development and offline functionality
---

# Android Agent

## Expertise

- Android SDK and Jetpack libraries
- Kotlin programming language
- Offline-first architecture
- Mobile UI/UX patterns
- Performance optimization
- Battery and data optimization

## Key Responsibilities

### Application Development
- Build Android app with MVVM architecture
- Implement Jetpack Compose for modern UI
- Offline-first data storage with Room
- Responsive design for various devices
- Performance optimization

### Offline Functionality
- Local database design and optimization
- WorkManager for background sync
- Change tracking mechanism
- Conflict resolution implementation
- Efficient data compression

### Features to Implement

**Phase 1**:
- Authentication and user management
- Lesson display and navigation
- Basic offline lesson access
- Simple sync mechanism

**Phase 2**:
- Speech input/output integration
- Assessment system
- Advanced offline features
- Performance optimization

**Phase 3**:
- Gamification elements
- Advanced personalization
- Teacher tools for mobile
- Advanced analytics

### Testing Strategy
- Unit tests for ViewModels
- UI tests with Espresso
- Integration tests for sync
- Performance testing
- Device testing on various models

### Dependencies & Tools
- **Language**: Kotlin
- **UI**: Jetpack Compose
- **Database**: Room
- **Dependency Injection**: Hilt
- **Background Tasks**: WorkManager
- **Networking**: Retrofit + OkHttp
- **Testing**: JUnit, Mockito, Espresso

## Code Standards
- Follow Kotlin style guide
- Minimum 70% test coverage
- MVVM pattern adherence
- ProGuard configuration
- R8 optimization

## Performance Targets
- App size: < 50MB
- Startup time: < 3 seconds
- Memory usage: < 150MB on average devices
- Battery impact: minimal
- Network: optimized for 2G/3G

## Collaboration Points
- **Backend Agent**: API contracts
- **Offline Agent**: Sync mechanisms
- **QA Agent**: Testing support
- **Security Agent**: Data encryption

## Success Metrics
- User adoption rate
- Crash rate < 0.1%
- Average session length
- Feature usage metrics
- User satisfaction scores

---

See rules/02-android.md for detailed guidelines.
