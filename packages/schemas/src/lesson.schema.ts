import { z } from 'zod';
import { DifficultyLevel, AssetType } from '@janbhasha/domain';

export const LearningAssetSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.nativeEnum(AssetType),
  url: z.string().url(),
  title: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().nonnegative(),
  durationSeconds: z.number().nonnegative().optional(),
  checksum: z.string().optional(),
});

export const LessonSectionSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1),
  content: z.string().min(1),
  order: z.number().int().nonnegative(),
  assets: z.array(LearningAssetSchema).default([]),
  nativeScriptContent: z.string().optional(),
  transliteration: z.string().optional(),
  phoneticAudioUrl: z.string().url().optional(),
  vocabularyItemIds: z.array(z.string()).optional(),
});

export const CreateLessonSchema = z.object({
  moduleId: z.string().uuid(),
  courseId: z.string().uuid(),
  title: z.string().min(1).max(200),
  nativeTitle: z.string().min(1).max(200),
  languageId: z.string().min(2),
  description: z.string().max(1000),
  difficulty: z.nativeEnum(DifficultyLevel),
  estimatedMinutes: z.number().int().positive().max(180),
  order: z.number().int().nonnegative(),
  sections: z.array(LessonSectionSchema).min(1),
  assets: z.array(LearningAssetSchema).default([]),
  isPublished: z.boolean().default(false),
});

export const UpdateLessonSchema = CreateLessonSchema.partial();
