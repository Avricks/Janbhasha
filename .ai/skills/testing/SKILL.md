---
name: Testing Framework Skill
description: Implement comprehensive testing strategies across all components
applyTo: ["tests/**"]
relatedAgent: "qa-agent"
---

# Testing Framework Skill

## Testing Pyramid

```
        △
       /  \        E2E Tests
      /    \       Integration Tests
     /______\      Unit Tests
      (high coverage)
```

## Unit Testing

### Backend Tests
```python
import pytest

def test_translation_service():
    """Test translation service"""
    translator = TranslationService()
    result = translator.translate("ake", "santhali", "english")
    
    assert result == "one"
    assert result is not None
```

### Mobile Tests
```kotlin
@Test
fun testLessonViewModel() {
    val repository = mockk<LessonRepository>()
    val viewModel = LessonViewModel(repository)
    
    coEvery { repository.getLessons() } returns listOf(
        Lesson("1", "Numbers", "Learn numbers 1-10")
    )
    
    val lessons = viewModel.lessons.value
    assert(lessons.size == 1)
}
```

## Integration Testing

### Service Integration
```python
@pytest.mark.integration
class TestServiceIntegration:
    def setup_method(self):
        self.api_client = APIClient()
        self.db = TestDatabase()
    
    def test_lesson_creation_workflow(self):
        """Test complete lesson creation"""
        # Create via API
        response = self.api_client.create_lesson({
            "title": "Numbers",
            "content": "1, 2, 3"
        })
        
        # Verify in database
        lesson = self.db.get_lesson(response['id'])
        assert lesson.title == "Numbers"
```

### API Integration
```python
@pytest.mark.integration
def test_api_endpoint():
    """Test API endpoint with real database"""
    client = TestClient(app)
    
    response = client.post("/v1/lessons", json={
        "title": "Basic Vocabulary",
        "language": "santhali"
    })
    
    assert response.status_code == 201
    assert "id" in response.json()
```

## End-to-End Testing

### Mobile E2E
```kotlin
@RunWith(AndroidJUnit4::class)
class LessonFlowE2ETest {
    @get:Rule
    val composeTestRule = createComposeRule()
    
    @Test
    fun testCompleteLessonFlow() {
        composeTestRule.setContent {
            JanBhashaApp()
        }
        
        // Click on first lesson
        composeTestRule.onNodeWithText("Numbers").performClick()
        
        // Verify lesson content displayed
        composeTestRule.onNodeWithText("ake").assertIsDisplayed()
        
        // Complete quiz
        composeTestRule.onNodeWithText("Submit").performClick()
        
        // Verify completion
        composeTestRule.onNodeWithText("Quiz Completed!").assertIsDisplayed()
    }
}
```

### Web E2E
```javascript
describe("Lesson Learning Flow", () => {
    it("should complete a full lesson", () => {
        cy.visit("/lessons");
        cy.contains("Numbers").click();
        cy.get('[data-test="lesson-content"]').should("be.visible");
        cy.get('[data-test="complete-button"]').click();
        cy.contains("Lesson Completed").should("be.visible");
    });
});
```

## AI Model Testing

### Model Evaluation
```python
def test_translation_model():
    """Evaluate translation model"""
    test_pairs = [
        ("ake", "one"),
        ("inne", "two"),
        ("ape", "three")
    ]
    
    model = load_model("translation_model_v1")
    
    correct = 0
    for source, expected in test_pairs:
        result = model.translate(source)
        if result == expected:
            correct += 1
    
    accuracy = correct / len(test_pairs)
    assert accuracy > 0.8, f"Model accuracy {accuracy} below threshold"
```

### Speech Model Testing
```python
def test_speech_recognition():
    """Test STT model"""
    model = load_model("santhali_asr")
    
    test_audio = load_test_audio("santhali_numbers.wav")
    transcript = model.transcribe(test_audio)
    
    expected = "ake inne ape"
    wer = calculate_wer(expected, transcript)
    
    assert wer < 0.15, f"WER {wer} above threshold"
```

## Performance Testing

### Load Testing
```python
from locust import HttpUser, task, between

class UserLoadTest(HttpUser):
    wait_time = between(1, 3)
    
    @task
    def get_lesson(self):
        self.client.get("/api/v1/lessons/123")
    
    @task
    def get_progress(self):
        self.client.get("/api/v1/progress/user-456")
```

### Memory Testing
```kotlin
// Android: Monitor memory usage
@Test
fun testMemoryUsage() {
    // Get initial memory
    val runtime = Runtime.getRuntime()
    val startMemory = runtime.totalMemory() - runtime.freeMemory()
    
    // Perform operation
    val viewModel = LessonViewModel(mockRepository)
    repeat(1000) {
        viewModel.loadLessons()
    }
    
    // Check memory
    val endMemory = runtime.totalMemory() - runtime.freeMemory()
    val memoryUsed = endMemory - startMemory
    
    assertTrue(memoryUsed < 50_000_000) // 50MB max
}
```

## Accessibility Testing

### Automated Accessibility
```kotlin
@Test
fun testAccessibility() {
    val rule = AccessibilityChecks.enable()
    composeTestRule.setContent { LessonScreen() }
    
    // Checks for:
    // - Missing content descriptions
    // - Color contrast issues
    // - Touch target sizes
    // - Text readability
}
```

### Manual Accessibility
```
- Test with screen reader (TalkBack, VoiceOver)
- Verify keyboard navigation
- Check color contrast ratios
- Test with accessibility settings
```

## Test Coverage Goals

| Component | Target Coverage |
|-----------|-----------------|
| Backend Services | > 80% |
| Mobile App | > 70% |
| Web Frontend | > 60% |
| Critical Paths | 100% |
| Utilities | > 85% |

## Continuous Testing

### CI/CD Integration
```yaml
# GitHub Actions example
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run unit tests
        run: npm run test:unit
      - name: Run integration tests
        run: npm run test:integration
      - name: Run E2E tests
        run: npm run test:e2e
      - name: Upload coverage
        run: npm run coverage:upload
```

---

See rules/07-testing.md and qa-agent.md for testing guidelines.
