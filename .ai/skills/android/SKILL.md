---
name: Android Development Skill
description: Develop Android applications for Janbhasha using Kotlin and Jetpack
applyTo: ["apps/android/**"]
relatedAgent: "android-agent"
---

# Android Development Skill

## Overview

This skill encompasses the complete Android development lifecycle for the Janbhasha educational platform, including offline-first architecture, Jetpack Compose UI, and local data persistence.

## Key Components

### Architecture
- MVVM (Model-View-ViewModel) pattern
- Repository pattern for data access
- Dependency injection with Hilt
- Reactive programming with coroutines

### UI Framework
- Jetpack Compose for modern declarative UI
- Material Design 3 compliance
- Responsive layouts
- Accessibility features

### Data Layer
- Room database for local storage
- Secure SharedPreferences
- File-based storage for assets
- Encryption for sensitive data

### Networking
- Retrofit with OkHttp
- Interceptors for request/response handling
- Certificate pinning
- Offline-first sync

## Development Workflow

1. **Setup**: Clone repo, install dependencies
2. **Architecture**: Follow MVVM with clear separation
3. **UI Development**: Use Compose, test responsiveness
4. **Data Layer**: Implement Room schemas
5. **Testing**: Unit tests, UI tests, integration tests
6. **Performance**: Optimize memory, battery, network
7. **Quality**: Run linting, code analysis, tests

## Common Tasks

### Creating a New Feature
```kotlin
// ViewModel with Compose
@HiltViewModel
class LessonViewModel @Inject constructor(
    private val repository: LessonRepository
) : ViewModel() {
    val lessons: StateFlow<List<Lesson>> = 
        repository.getLessons().stateIn(...)
}
```

### Database Operations
```kotlin
@Entity
data class Lesson(
    @PrimaryKey val id: String,
    val title: String,
    val content: String
)
```

### UI Components
```kotlin
@Composable
fun LessonScreen(viewModel: LessonViewModel) {
    val lessons by viewModel.lessons.collectAsState()
    LazyColumn {
        items(lessons) { lesson ->
            LessonCard(lesson)
        }
    }
}
```

## Testing Strategies

### Unit Tests
- Test ViewModels with test repositories
- Mock external dependencies
- Use JUnit and Mockito

### UI Tests
- Test Compose components with Espresso
- Test navigation flows
- Test accessibility

### Integration Tests
- Test database operations
- Test sync mechanisms
- Test end-to-end user flows

## Performance Optimization

- Use Lazy loading for lists
- Optimize database queries
- Reduce memory footprint
- Battery usage awareness
- Network efficiency

## Debugging Tools

- Logcat for debugging
- Android Studio Debugger
- Profiler for performance
- Database Inspector
- Network Inspector

## Resources

- [Android Docs](https://developer.android.com)
- [Jetpack Compose](https://developer.android.com/jetpack/compose)
- [MVVM Pattern](https://developer.android.com/arch)

---

See rules/02-android.md for detailed guidelines.
