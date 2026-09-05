import { z } from 'zod';
import { QuestionType } from '@janbhasha/domain';

export const ChoiceSchema = z.object({
  id: z.string().uuid().optional(),
  text: z.string().min(1),
  nativeScriptText: z.string().optional(),
  audioUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  isCorrect: z.boolean(),
  explanation: z.string().optional(),
});

export const QuestionSchema = z.object({
  id: z.string().uuid().optional(),
  prompt: z.string().min(1),
  nativeScriptPrompt: z.string().optional(),
  type: z.nativeEnum(QuestionType),
  points: z.number().int().positive().default(1),
  difficultyRating: z.number().min(-3.0).max(3.0).default(0.0),
  discriminationParam: z.number().min(0.0).max(3.0).default(1.0),
  guessingParam: z.number().min(0.0).max(1.0).default(0.25),
  choices: z.array(ChoiceSchema).optional(),
  acceptableAnswers: z.array(z.string()).optional(),
  referenceAudioUrl: z.string().url().optional(),
  audioPromptUrl: z.string().url().optional(),
  rubric: z.record(z.string(), z.number()).optional(),
  explanation: z.string().default(''),
  order: z.number().int().nonnegative(),
});

export const CreateQuizSchema = z.object({
  lessonId: z.string().uuid().optional(),
  moduleId: z.string().uuid().optional(),
  courseId: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).default(''),
  passingScorePercent: z.number().min(0).max(100).default(60),
  timeLimitSeconds: z.number().positive().optional(),
  questions: z.array(QuestionSchema).min(1),
  isAdaptive: z.boolean().default(false),
  maxAttempts: z.number().int().positive().optional(),
});

export const SubmitQuizResponseSchema = z.object({
  quizId: z.string().uuid(),
  responses: z.array(
    z.object({
      questionId: z.string().uuid(),
      selectedChoiceId: z.string().uuid().optional(),
      textResponse: z.string().optional(),
      audioResponseUrl: z.string().url().optional(),
      timeSpentSeconds: z.number().nonnegative(),
    }),
  ),
});
