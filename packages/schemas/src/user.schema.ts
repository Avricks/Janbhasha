import { z } from 'zod';
import { UserRole, AgeGroup } from '@janbhasha/domain';

export const UserPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  preferredLanguage: z.string().min(2).default('sat'),
  secondaryLanguage: z.string().optional(),
  audioPlaybackSpeed: z.number().min(0.5).max(2.0).default(1.0),
  fontSize: z.number().min(12).max(32).default(16),
  highContrast: z.boolean().default(false),
  reducedMotion: z.boolean().default(false),
  offlineDownloadsEnabled: z.boolean().default(true),
  soundEffectsEnabled: z.boolean().default(true),
});

export const RegisterUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  fullName: z.string().min(2).max(100),
  role: z.nativeEnum(UserRole).default(UserRole.LEARNER),
  ageGroup: z.nativeEnum(AgeGroup).default(AgeGroup.ADULT),
  nativeLanguage: z.string().min(2),
  targetLanguages: z.array(z.string()).min(1),
  parentEmail: z.string().email().optional(),
});

export const LoginUserSchema = z.object({
  emailOrUsername: z.string().min(1),
  password: z.string().min(1),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export const UpdateProfileSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  avatarUrl: z.string().url().optional(),
  preferences: UserPreferencesSchema.partial().optional(),
  targetLanguages: z.array(z.string()).optional(),
  phoneNumber: z.string().optional(),
});
