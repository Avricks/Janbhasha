# Janbhasha Agent System

This document outlines the AI agent system that powers Janbhasha's development and operation.

## Agent Hierarchy

### 1. **Orchestrator Agent**
- **Role**: Central coordination and task routing
- **Responsibilities**: Route tasks to appropriate agents, manage interdependencies
- **Files**: `.ai/agents/orchestrator.md`

### 2. **Domain-Specific Agents**

#### Android Agent
- **Focus**: Mobile application development, offline functionality
- **Skills**: Kotlin/Java, Android SDKs, offline sync mechanisms
- **File**: `.ai/agents/android-agent.md`

#### Backend Agent
- **Focus**: API services, data management, system architecture
- **Skills**: Node.js/Python, database design, microservices
- **File**: `.ai/agents/backend-agent.md`

#### AI/NLP Agent
- **Focus**: Machine learning, language models, translation
- **Skills**: PyTorch, Hugging Face, NLP pipelines
- **File**: `.ai/agents/ai-nlp-agent.md`

#### Speech Agent
- **Focus**: Speech recognition, synthesis, audio processing
- **Skills**: Audio processing, TTS/STT models, sound quality
- **File**: `.ai/agents/speech-agent.md`

#### Offline Agent
- **Focus**: Offline capabilities, data synchronization
- **Skills**: Local data management, sync protocols, cache strategies
- **File**: `.ai/agents/offline-agent.md`

#### Pedagogy Agent
- **Focus**: Educational content, learning science, assessment
- **Skills**: Instructional design, pedagogical frameworks
- **File**: `.ai/agents/pedagogy-agent.md`

#### Security Agent
- **Focus**: Security, compliance, data protection
- **Skills**: Authentication, encryption, compliance regulations
- **File**: `.ai/agents/security-agent.md`

#### QA Agent
- **Focus**: Testing, quality assurance, performance
- **Skills**: Test automation, performance profiling, debugging
- **File**: `.ai/agents/qa-agent.md`

#### DevOps Agent
- **Focus**: Deployment, infrastructure, monitoring
- **Skills**: Docker, Kubernetes, CI/CD, monitoring
- **File**: `.ai/agents/devops-agent.md`

## Skills System

Each agent has associated skills that define specialized capabilities:

```
.ai/skills/
├── android/SKILL.md              - Android-specific implementations
├── offline-ai/SKILL.md           - Offline architecture and sync
├── translation/SKILL.md          - Translation pipeline skills
├── speech/SKILL.md               - Speech processing skills
├── worksheet-generation/SKILL.md - Pedagogical content creation
├── assessment/SKILL.md           - Assessment system design
├── sync/SKILL.md                 - Data synchronization
├── testing/SKILL.md              - QA and testing frameworks
└── security/SKILL.md             - Security implementations
```

## Rules System

Global and domain-specific rules guide agent behavior:

```
.ai/rules/
├── 00-global.md      - Universal principles
├── 01-architecture.md - System design rules
├── 02-android.md     - Mobile-specific rules
├── 03-ai.md          - AI/ML guidelines
├── 04-translation.md - Translation accuracy rules
├── 05-offline.md     - Offline mode rules
├── 06-security.md    - Security requirements
├── 07-testing.md     - Testing standards
├── 08-api.md         - API design patterns
├── 09-database.md    - Database standards
└── 10-ui-ux.md       - UI/UX guidelines
```

## Agent-to-Agent Communication

- **Orchestrator** coordinates between specialized agents
- **Agents share concerns** (e.g., Security Agent reviews all components)
- **Dependencies** are documented in `.ai/agents/` files
- **Conflicts** are resolved through documented decision processes

## Skill Templates

Skills are documented in `SKILL.md` format:

```markdown
---
name: skill-name
description: What this skill accomplishes
applyTo: [patterns matching this skill]
---

## Overview
Brief description

## Usage
How to invoke this skill

## Implementation Details
Technical details

## Examples
Code examples and use cases
```

## Integration Points

- **Prompts**: `.ai/prompts/` contains LLM prompts for different contexts
- **Templates**: `.ai/templates/` for feature, bug, ADR, and task templates
- **Documentation**: Cross-referenced with `/docs` for user-facing docs

---

For detailed agent specifications, see individual files in `.ai/agents/`.
