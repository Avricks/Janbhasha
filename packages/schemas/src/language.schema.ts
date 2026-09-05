import { z } from 'zod';
import { SupportedLanguage } from '@janbhasha/domain';

export const TranslationRequestSchema = z.object({
  text: z.string().min(1).max(5000),
  sourceLanguage: z.nativeEnum(SupportedLanguage),
  targetLanguage: z.nativeEnum(SupportedLanguage),
  domain: z.enum(['general', 'pedagogy', 'cultural', 'grammar']).default('general'),
  preserveFormatting: z.boolean().default(true),
});

export const SpeechTranscribeRequestSchema = z.object({
  audioBase64: z.string().min(1).optional(),
  audioUrl: z.string().url().optional(),
  language: z.nativeEnum(SupportedLanguage),
  sampleRate: z.number().int().default(16000),
});

export const SpeechSynthesizeRequestSchema = z.object({
  text: z.string().min(1).max(2000),
  language: z.nativeEnum(SupportedLanguage),
  voiceGender: z.enum(['female', 'male']).default('female'),
  speed: z.number().min(0.5).max(2.0).default(1.0),
});
