/**
 * Assessment, Quiz, and Grading Domain Models
 */

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SHORT_ANSWER = 'short_answer',
  SPEAKING_PRONUNCIATION = 'speaking_pronunciation',
  LISTENING_COMPREHENSION = 'listening_comprehension',
  FILL_IN_BLANK = 'fill_in_blank',
  MATCHING = 'matching',
}

export interface Choice {
  id: string;
  text: string;
  nativeScriptText?: string;
  audioUrl?: string;
  imageUrl?: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Question {
  id: string;
  quizId: string;
  prompt: string;
  nativeScriptPrompt?: string;
  type: QuestionType;
  points: number;
  difficultyRating: number; // IRT difficulty param (-3.0 to +3.0)
  discriminationParam: number; // IRT discrimination param
  guessingParam: number; // IRT pseudo-guessing param
  choices?: Choice[];
  acceptableAnswers?: string[];
  referenceAudioUrl?: string;
  audioPromptUrl?: string;
  rubric?: Record<string, number>;
  explanation: string;
  order: number;
}

export interface Quiz {
  id: string;
  lessonId?: string;
  moduleId?: string;
  courseId?: string;
  title: string;
  description: string;
  passingScorePercent: number;
  timeLimitSeconds?: number;
  questions: Question[];
  isAdaptive: boolean;
  maxAttempts?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  questionId: string;
  selectedChoiceId?: string;
  textResponse?: string;
  audioResponseUrl?: string;
  isCorrect: boolean;
  scoreAwarded: number;
  maxScore: number;
  feedback?: string;
  timeSpentSeconds: number;
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  attemptNumber: number;
  responses: UserResponse[];
  totalScore: number;
  maxPossibleScore: number;
  scorePercentage: number;
  isPassed: boolean;
  estimatedAbilityTheta?: number; // IRT ability score
  completedAt: Date;
  syncedAt?: Date;
}
