---
name: Assessment System Skill
description: Design and implement assessment systems for language learning evaluation
applyTo: ["services/assessment/**"]
relatedAgent: "pedagogy-agent"
---

# Assessment System Skill

## Overview

This skill covers the complete assessment lifecycle including test design, administration, grading, and analytics.

## Assessment Types

### Formative Assessment
- Low-stakes quizzes
- Progress checks
- Self-assessment
- Immediate feedback
- Learning guidance

### Summative Assessment
- Unit exams
- Proficiency tests
- Course completion assessments
- Certification exams
- Portfolio evaluation

## Question Types

### Multiple Choice
```json
{
  "type": "multiple-choice",
  "question": "What is the Santhali word for 'one'?",
  "options": ["ake", "inne", "ape"],
  "correctAnswer": 0,
  "points": 1
}
```

### Short Answer
```json
{
  "type": "short-answer",
  "question": "Translate: 'Good morning' to Santhali",
  "correctAnswers": ["sadaw puyuk", "Sadaw puyuk"],
  "points": 2,
  "caseSensitive": false
}
```

### Speaking/Pronunciation
```json
{
  "type": "speaking",
  "prompt": "Pronounce the word: ake",
  "reference_audio": "url-to-reference",
  "rubric": {
    "pronunciation": 5,
    "clarity": 5,
    "fluency": 5
  },
  "points": 15
}
```

### Listening Comprehension
```json
{
  "type": "listening",
  "audio": "url-to-audio",
  "question": "What was the main topic?",
  "options": ["greeting", "numbers", "food"],
  "correctAnswer": 1,
  "points": 2
}
```

## Adaptive Testing

### Item Response Theory (IRT)
```python
def estimate_ability(responses: List[Response]) -> float:
    """Estimate learner ability using IRT"""
    # 3PL (3-parameter logistic) model
    theta = 0  # Initial ability estimate
    
    for response in responses:
        difficulty = response.item.difficulty
        discrimination = response.item.discrimination
        guessing = response.item.guessing
        
        # Update ability estimate
        theta = update_theta(theta, response.correct, 
                           difficulty, discrimination)
    
    return theta
```

### Adaptive Question Selection
```python
def select_next_question(learner_ability: float,
                        previous_performance: float,
                        difficulty_range: Tuple) -> Question:
    """Select next question based on learner performance"""
    
    # Target difficulty = learner ability
    target_difficulty = learner_ability
    
    # Select from appropriate range
    candidates = get_questions(
        min_difficulty=target_difficulty - 0.5,
        max_difficulty=target_difficulty + 0.5
    )
    
    # Avoid previously seen questions
    candidates = filter_seen(candidates)
    
    return select_best(candidates)
```

## Grading & Scoring

### Automatic Grading
```python
def grade_response(response: Response) -> float:
    """Grade a single response"""
    
    if response.type == "multiple-choice":
        score = 1.0 if response.answer == response.correctAnswer else 0.0
    
    elif response.type == "short-answer":
        # Fuzzy matching for partial credit
        similarity = calculate_similarity(
            response.answer,
            response.correctAnswers
        )
        score = similarity * response.points
    
    elif response.type == "speaking":
        # Use ASR for pronunciation
        score = evaluate_pronunciation(response.audio)
    
    return score
```

### Performance Calculation
```python
def calculate_performance(quiz_responses: List[Response]) -> Performance:
    """Calculate overall performance metrics"""
    
    total_points = sum(r.points for r in quiz_responses)
    earned_points = sum(grade_response(r) for r in quiz_responses)
    percentage = (earned_points / total_points) * 100
    
    return Performance(
        score=earned_points,
        maxScore=total_points,
        percentage=percentage,
        level=get_proficiency_level(percentage)
    )
```

## Feedback Generation

### Immediate Feedback
```python
def generate_feedback(response: Response) -> str:
    """Generate immediate feedback on response"""
    
    is_correct = response.answer == response.correctAnswer
    
    feedback = {
        "correct": is_correct,
        "message": "Correct!" if is_correct else "Not quite right",
        "explanation": response.explanation,
        "hint": response.hint if not is_correct else None,
        "reference": response.reference_resource
    }
    
    return feedback
```

### Progress Feedback
```python
def generate_progress_report(learner_id: str) -> Report:
    """Generate learner progress report"""
    
    assessments = get_assessments(learner_id)
    
    report = {
        "totalAssessments": len(assessments),
        "averageScore": calculate_average(assessments),
        "trend": analyze_trend(assessments),
        "strengths": identify_strengths(assessments),
        "areasForImprovement": identify_weaknesses(assessments),
        "recommendations": generate_recommendations(assessments)
    }
    
    return report
```

## Analytics & Analytics Insights

### Performance Metrics
```python
class AssessmentAnalytics:
    def __init__(self, assessment_id: str):
        self.assessment = Assessment.load(assessment_id)
        self.responses = Response.filter(assessment_id)
    
    def average_score(self):
        """Average score across learners"""
        return np.mean([grade_response(r) for r in self.responses])
    
    def difficulty_analysis(self):
        """Which questions are most difficult?"""
        scores_by_question = {}
        for question_id in self.assessment.questions:
            responses = [r for r in self.responses 
                        if r.question_id == question_id]
            scores_by_question[question_id] = np.mean([
                grade_response(r) for r in responses
            ])
        return scores_by_question
    
    def discrimination_index(self):
        """Questions that discriminate between high/low performers"""
        high_performers = top_25_percentile(self.responses)
        low_performers = bottom_25_percentile(self.responses)
        
        discrimination = {}
        for question_id in self.assessment.questions:
            high_score = avg_score_for_group(
                high_performers, question_id
            )
            low_score = avg_score_for_group(
                low_performers, question_id
            )
            discrimination[question_id] = high_score - low_score
        
        return discrimination
```

## Accessibility

### Accessible Assessment
- Text alternatives for images
- Readable fonts and colors
- Keyboard navigation
- Screen reader support
- Extended time options
- Large print versions
- Audio content with transcripts

---

See pedagogy-agent.md and rules/07-testing.md for testing guidelines.
