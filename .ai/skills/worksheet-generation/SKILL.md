---
name: Worksheet Generation Skill
description: Create and generate educational content and worksheets programmatically
applyTo: ["services/content/**", ".ai/prompts/"]
relatedAgent: "pedagogy-agent"
---

# Worksheet Generation Skill

## Overview

This skill provides methods for creating, managing, and generating educational content including worksheets, quizzes, and lesson materials.

## Content Types

### Vocabulary Lessons
```markdown
# Lesson: Numbers (1-10)

## Santhali Numbers
1. ake (one)
2. inne (two)
3. ape (three)

## Practice
- Write each number 5 times
- Pronounce with native speaker audio
- Match with images
```

### Grammar Exercises
```markdown
# Grammar: Verb Conjugation

## Present Tense
Subject + Verb + Object

Example: 
- Ake kutu menhe (I eat rice)
- Hata kutu menhe (He eats rice)

## Exercises
1. Conjugate with different subjects
2. Fill in blanks
3. Write sentences
```

### Listening Comprehension
```markdown
# Listening Exercise: Daily Greetings

## Instructions
1. Listen to the audio
2. Repeat after the speaker
3. Translate to English

## Audio: [Link to audio file]
Text: Sadaw puyuk (Good morning)
```

### Reading Passages
```markdown
# Reading: Day in the Life

Sidhu em sapel menhe kutu. Hanta sapel puyuk ren. 
Sida baṭa akaṛ menhe em baṭa sapel menhe.

## Vocabulary
- sapel: morning
- menhe: 3sg past
- kutu: rice
```

## Worksheet Template System

### Template Structure
```yaml
id: "worksheet-001"
title: "Basic Vocabulary"
language: "santhali"
difficulty: "beginner"
estimatedTime: "15 minutes"
sections:
  - type: "vocabulary"
    items:
      - word: "ake"
        meaning: "one"
        audio: "url-to-audio"
  - type: "exercise"
    questions:
      - type: "multiple-choice"
        prompt: "Select the correct translation"
        options: ["one", "two", "three"]
        correct: 0
```

## Content Generation

### Automated Quiz Generation
```python
def generate_quiz(topic: str, difficulty: str, 
                  num_questions: int) -> Quiz:
    """Generate quiz questions from content database"""
    concepts = get_concepts(topic)
    
    questions = []
    for concept in concepts[:num_questions]:
        question = {
            "type": "multiple-choice",
            "concept": concept,
            "difficulty": difficulty,
            "options": generate_options(concept, difficulty),
            "correctAnswer": 0
        }
        questions.append(question)
    
    return Quiz(title=topic, questions=questions)
```

### Content Sequencing
```python
def generate_learning_path(learner_level: str, 
                           topics: List[str]) -> Path:
    """Create sequenced learning path"""
    path = []
    
    for topic in topics:
        lessons = get_lessons(topic, learner_level)
        exercises = get_exercises(topic, learner_level)
        assessment = get_assessment(topic, learner_level)
        
        path.extend(lessons)
        path.extend(exercises)
        path.append(assessment)
    
    return Path(items=path)
```

## Quality Assurance

### Content Review Checklist
- [ ] Linguistic accuracy verified
- [ ] Culturally appropriate
- [ ] Pedagogically sound
- [ ] Accessibility reviewed
- [ ] Audio quality checked
- [ ] Links/resources working

### Validation
```python
def validate_worksheet(worksheet: Worksheet):
    """Validate worksheet structure and content"""
    
    # Check required fields
    assert worksheet.title
    assert worksheet.language
    assert worksheet.difficulty
    
    # Check content
    for section in worksheet.sections:
        validate_section(section)
    
    return True
```

## Metadata & Organization

### Metadata Structure
```json
{
  "id": "ws-001",
  "title": "Numbers 1-10",
  "language": "santhali",
  "difficulty": "A1",
  "topics": ["numbers", "counting"],
  "duration": 15,
  "created": "2024-01-15",
  "updated": "2024-01-16",
  "author": "linguist-team",
  "reviewed": true,
  "reviewedBy": ["expert-1", "expert-2"]
}
```

### Version Control
```python
# Track worksheet versions
versioned_content = {
    "v1": {"content": "original", "date": "2024-01-01"},
    "v2": {"content": "improved", "date": "2024-01-15"},
    "current": "v2"
}
```

## Integration

### API for Content Delivery
```python
@app.get("/lessons/{topic}")
async def get_lesson(topic: str, 
                     language: str = "santhali",
                     difficulty: str = "A1"):
    lesson = get_lesson_from_db(topic, language, difficulty)
    return lesson

@app.post("/worksheets/generate")
async def generate_worksheet(params: WorksheetParams):
    worksheet = generate_quiz(
        topic=params.topic,
        difficulty=params.difficulty,
        num_questions=params.num_questions
    )
    save_to_db(worksheet)
    return worksheet
```

### Localization
```python
# Multi-language support
def localize_worksheet(worksheet: Worksheet, 
                       target_language: str) -> Worksheet:
    for section in worksheet.sections:
        section.content = translate(
            section.content, 
            target_language
        )
    return worksheet
```

## Export Formats

### PDF Export
```python
def export_to_pdf(worksheet: Worksheet) -> bytes:
    from reportlab.pdfgen import canvas
    
    pdf = canvas.Canvas("worksheet.pdf")
    # Add content to PDF
    pdf.save()
    return pdf.getbuffer()
```

### Markdown Export
```python
def export_to_markdown(worksheet: Worksheet) -> str:
    md = f"# {worksheet.title}\n\n"
    for section in worksheet.sections:
        md += section.to_markdown()
    return md
```

---

See rules/10-ui-ux.md and pedagogy-agent.md for content guidelines.
