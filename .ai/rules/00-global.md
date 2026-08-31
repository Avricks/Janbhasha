# Global Rules for Janbhasha Project

## Universal Principles

### 1. Language & Linguistic Accuracy
- All language content must be verified by native speakers
- Maintain linguistic accuracy for Santhali, Mundari, and Ho
- Respect linguistic variations and dialects
- Document language-specific rules and exceptions

### 2. Accessibility & Inclusion
- Follow WCAG 2.1 AA standards
- Design for low-literacy and varied tech proficiency
- Support multiple interaction modalities (text, speech, gesture)
- Consider cultural and context-specific needs

### 3. Offline-First Thinking
- All features must have offline-first design consideration
- Progressive enhancement: offline core, online features optional
- Efficient data usage and storage
- Graceful degradation in connectivity

### 4. Privacy & Data Protection
- Minimal data collection - only what's necessary
- Explicit user consent for data usage
- Implement data retention policies
- Right to deletion for all personal data
- GDPR and COPPA compliance

### 5. Quality & Reliability
- Comprehensive testing: unit, integration, E2E
- High code standards and documentation
- Error handling and graceful degradation
- Monitoring and alerting for production

### 6. Community & Sustainability
- Open-source-first approach
- Community contribution welcome
- Transparent decision-making (ADRs)
- Long-term sustainability focus

### 7. Performance & Efficiency
- Optimize for low-power devices
- Minimize bandwidth usage
- Fast response times (< 200ms p95)
- Efficient resource management

### 8. Security by Default
- Principle of least privilege
- Secure communication (TLS 1.3+)
- Regular security audits
- Proactive vulnerability management

## Documentation Standards

- README files for all major components
- Inline code comments for complex logic
- Architecture documentation for major systems
- Decision records (ADRs) for important decisions
- Change logs for versioning

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: feat, fix, docs, style, refactor, test, chore, ci

---

See other rule files for domain-specific guidelines.
