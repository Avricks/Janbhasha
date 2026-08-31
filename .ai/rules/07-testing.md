# Testing & Quality Assurance Rules

## Testing Pyramid

### 1. Unit Tests
- High coverage (> 80%)
- Test individual functions/methods
- Mock external dependencies
- Fast execution
- Isolated from other tests

### 2. Integration Tests
- Service-to-service testing
- Database integration tests
- API integration tests
- Real external dependencies
- Slower but comprehensive

### 3. End-to-End Tests
- User journey testing
- Mobile app testing
- Web interface testing
- Real system interactions
- Performance monitoring

### 4. Specialized Tests
- AI evaluation tests (model quality)
- Offline sync tests
- Security/penetration tests
- Performance tests
- Accessibility tests

## Test Coverage Standards

### By Component
- **Backend Services**: > 80% coverage
- **Mobile App**: > 70% coverage
- **Frontend**: > 60% coverage
- **Critical Paths**: 100% coverage

### Test Types
- Happy path testing
- Error handling
- Edge cases
- Boundary conditions
- Security scenarios

## Quality Metrics

### Code Quality
- Cyclomatic complexity limits
- Code duplication detection
- Static analysis rules
- Linting compliance
- Documentation completeness

### Performance Metrics
- API response time (< 200ms p95)
- Mobile app startup time
- Database query performance
- Memory usage targets
- Battery consumption

### Reliability Metrics
- Error rate monitoring
- Crash reporting
- Uptime tracking
- Sync success rates
- User-facing issue tracking

## CI/CD Testing

### Automated Testing
- Pre-commit hooks
- Pull request testing
- Nightly build testing
- Staging environment testing
- Production monitoring

### Test Execution
- Parallel test execution
- Test result reporting
- Failure notifications
- Test history tracking
- Trend analysis

## AI Model Testing

### Evaluation Metrics
- BLEU scores (translation)
- WER (speech recognition)
- Accuracy (classification)
- F1-scores
- Bias metrics

### Validation Sets
- Held-out test sets
- Cross-validation
- Language-specific validation
- Adversarial examples
- Edge case testing

---

See qa-agent.md and testing/SKILL.md for implementation.
