/**
 * Lesson, Module, and Course Domain Models
 */

export enum DifficultyLevel {
  BEGINNER = 'A0',
  ELEMENTARY = 'A1',
  INTERMEDIATE_LOW = 'A2',
  INTERMEDIATE_HIGH = 'B1',
  ADVANCED = 'B2',
}

export enum AssetType {
  AUDIO = 'audio',
  VIDEO = 'video',
  IMAGE = 'image',
  TRANSCRIPT = 'transcript',
  DOCUMENT = 'document',
}

export interface LearningAsset {
  id: string;
  type: AssetType;
  url: string;
  localPath?: string;
  title: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds?: number;
  checksum?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  order: number;
  assets: LearningAsset[];
  nativeScriptContent?: string;
  transliteration?: string;
  phoneticAudioUrl?: string;
  vocabularyItemIds?: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  nativeTitle: string;
  languageId: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  order: number;
  sections: LessonSection[];
  assets: LearningAsset[];
  isPublished: boolean;
  version: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  nativeTitle: string;
  languageId: string;
  description: string;
  order: number;
  difficulty: DifficultyLevel;
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  nativeTitle: string;
  targetLanguageId: string;
  instructionLanguageId: string;
  description: string;
  difficulty: DifficultyLevel;
  thumbnailUrl?: string;
  modules: Module[];
  tags: string[];
  isPublished: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
