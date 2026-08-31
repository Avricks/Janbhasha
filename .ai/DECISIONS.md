# Architectural Decision Records (ADRs)

## ADR-001: Offline-First Architecture

**Status**: Accepted

**Context**: 
Many target learners in rural India have unreliable internet connectivity. An offline-first design is essential.

**Decision**:
Implement offline-first architecture with local SQLite database and bi-directional sync when online.

**Consequences**:
- Increased complexity in sync logic
- Need for conflict resolution strategy
- Reduced immediate data consistency
- Better user experience in low-bandwidth scenarios

---

## ADR-002: Microservices Architecture

**Status**: Accepted

**Context**:
Janbhasha requires diverse capabilities (translation, speech, assessment) that may scale independently.

**Decision**:
Use microservices architecture with dedicated services for each domain.

**Consequences**:
- Increased operational complexity
- Better scalability and fault isolation
- Asynchronous inter-service communication
- More sophisticated testing requirements

---

## ADR-003: PostgreSQL for Primary Data

**Status**: Accepted

**Context**:
Need reliable, ACID-compliant relational database for user data and learning records.

**Decision**:
Use PostgreSQL as primary data store with Redis for caching.

**Consequences**:
- Strong consistency guarantees
- Proven reliability and performance
- JSON support for flexible schemas
- Operational overhead

---

## ADR-004: Mobile-First Design

**Status**: Accepted

**Context**:
Primary user base accesses platform through Android devices in low-bandwidth environments.

**Decision**:
Prioritize Android app as primary interface with web apps as secondary channels.

**Consequences**:
- Optimized for mobile constraints (battery, data, processing power)
- Responsive web design as secondary priority
- Native functionality over cross-platform
- Android-specific testing and optimization

---

## ADR-005: Open Source ML Models

**Status**: Accepted

**Context**:
Licensing constraints and offline requirements make proprietary models unsuitable.

**Decision**:
Use open-source language models and fine-tune for regional languages.

**Consequences**:
- Model training and maintenance responsibility
- Community contribution opportunities
- Offline model deployment
- Quality assurance burden

---

## ADR-006: JWT-Based Authentication

**Status**: Accepted

**Context**:
Stateless authentication needed for scalable microservices architecture.

**Decision**:
Implement JWT tokens for authentication with refresh token rotation.

**Consequences**:
- Stateless API servers
- Token management complexity
- Clock synchronization requirements
- Immediate logout challenges

---

## ADR-007: Content Verification Workflow

**Status**: Accepted

**Context**:
Language accuracy is critical for educational platform serving native speakers.

**Decision**:
Implement multi-layer content verification: peer review, linguist review, community feedback.

**Consequences**:
- Slower content deployment
- Higher quality assurance
- Community engagement
- Operational overhead

---

## ADR-008: Encryption at Rest

**Status**: Accepted

**Context**:
Sensitive learner data and COPPA compliance requirements.

**Decision**:
Encrypt all sensitive data at rest using AES-256.

**Consequences**:
- Performance overhead
- Key management complexity
- Compliance with data protection regulations
- Recovery procedures required

---

## ADR-009: Progressive Web App vs Native

**Status**: Accepted

**Context**:
Need to support web access while maintaining offline capabilities.

**Decision**:
Primary native Android app with optional PWA for web access.

**Consequences**:
- Better offline support on mobile
- Native UI/UX capabilities
- Web app has limited offline features
- Platform-specific optimization

---

## ADR-010: Community-Driven Content

**Status**: Accepted

**Context**:
Sustainability requires community participation in content creation.

**Decision**:
Enable educators and community members to contribute content with review workflow.

**Consequences**:
- Scalable content production
- Quality control requirements
- Community engagement
- Moderation overhead

---

For new decisions, use `.ai/templates/ADR.md` template.
