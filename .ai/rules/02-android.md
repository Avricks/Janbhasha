# Android Development Rules

## Mobile Architecture

### 1. MVVM Pattern
- ViewModel for state management
- LiveData or StateFlow for reactive updates
- Repository pattern for data access
- Dependency injection with Hilt

### 2. Offline-First Implementation
- Room database for local storage
- WorkManager for background sync
- Change tracking for offline edits
- Conflict resolution on reconnection

### 3. Performance Optimization
- Minimize app size (target < 50MB base)
- Efficient memory management
- Battery optimization
- Network optimization for low bandwidth

### 4. User Interface
- Material Design 3 compliance
- Jetpack Compose for modern UI
- Accessibility features (ContentDescription, etc.)
- Support for dark mode

### 5. Data Persistence
- Room for structured data
- Encrypted SharedPreferences for sensitive data
- File storage for large assets
- Regular data backup

### 6. Networking
- Retrofit for API communication
- OkHttp with interceptors
- Timeout and retry policies
- Certificate pinning for security

### 7. Testing
- Unit tests with JUnit and Mockito
- UI tests with Espresso
- Integration tests for sync
- Performance testing

### 8. Security
- ProGuard/R8 for code obfuscation
- Secure key storage (KeyStore)
- Input validation
- Secure storage of credentials

## Android Dependencies

```gradle
- Jetpack: Compose, Navigation, Room, WorkManager, Hilt
- Networking: Retrofit, OkHttp
- Reactive: RxJava, Coroutines
- Testing: JUnit, Mockito, Espresso
- Serialization: Kotlin Serialization, Gson
```

## Minimum API Level
- Target: API 24 (7.0 Nougat)
- Minimum Support: API 21 (5.0 Lollipop)
- Maximum Development: Latest Android version

## Device Support
- Phone: 4.5" - 7" screens
- Tablet: 7"+ screens
- Low-end devices: 1GB RAM minimum
- Storage: 50MB minimum available

---

See android/SKILL.md for implementation details.
