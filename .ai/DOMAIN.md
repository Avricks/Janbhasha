# Janbhasha Domain Model

## Core Entities

### User
- **Learner**: Student engaged in language learning
- **Educator**: Teacher creating and managing content
- **Administrator**: System operator

### Learning Content
- **Lesson**: Structured learning unit
- **Module**: Collection of lessons
- **Course**: Complete curriculum for a language
- **Asset**: Learning resource (audio, video, text, image)

### Progress & Performance
- **LearningRecord**: Individual lesson completion
- **QuizResult**: Assessment performance
- **SkillLevel**: Language proficiency assessment
- **Achievement**: Milestone and badge system

### Language & Translation
- **Language**: Supported language (Santhali, Mundari, Ho)
- **Concept**: Language concept/word with translations
- **Phrase**: Multi-word expressions
- **GrammarRule**: Linguistic structure rules

### Assessment
- **Quiz**: Collection of questions
- **Question**: Individual assessment item
- **Choice**: Multiple-choice option
- **ExerciseType**: Different exercise formats

### Synchronization
- **SyncRecord**: Offline change tracking
- **ConflictResolution**: Strategy for merge conflicts
- **SyncState**: Current sync status

## Relationships

```
User
├── Learner
│   ├── has many → LearningRecord
│   ├── has many → QuizResult
│   ├── has many → SkillLevel
│   └── has many → Achievement
├── Educator
│   ├── creates many → Course
│   ├── creates many → Quiz
│   └── manages many → Learner
└── Administrator
    ├── manages → System Configuration
    └── views → Analytics

Course
├── has many → Module
├── has many → Lesson
├── references → Language
└── has many → Quiz

Language
├── has many → Concept
├── has many → GrammarRule
├── has many → Phrase
└── translates-to → Language

Assessment
├── has many → Question
├── has many → QuizResult
└── uses → ExerciseType
```

## Key Concepts

### Personalization
- Learning path adaptation based on:
  - User proficiency level
  - Learning pace preference
  - Content engagement metrics
  - Performance on assessments

### Offline-First Design
- Local state management
- Eventual consistency
- Change tracking
- Synchronization protocols

### Adaptive Learning
- Difficulty progression
- Content recommendation
- Pacing algorithms
- Remedial content routing

### Cultural Context
- Linguistic accuracy
- Cultural appropriateness
- Regional variations
- Community input integration

## Constraints & Rules

1. **Language Integrity**: All content must undergo linguistic verification
2. **Data Privacy**: Minimal collection, user consent required
3. **Offline Capability**: Core features must work offline
4. **Accessibility**: All features must be accessible to learners with disabilities
5. **Performance**: System must be responsive on low-power devices
6. **Consistency**: User data must remain consistent across devices

---

See GLOSSARY.md for detailed terminology definitions.
