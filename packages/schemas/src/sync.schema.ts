import { z } from 'zod';
import { SyncOperation } from '@janbhasha/domain';

export const SyncChangeSchema = z.object({
  id: z.string().uuid(),
  entityType: z.enum(['lesson', 'learning_record', 'quiz_result', 'user_preference', 'note']),
  entityId: z.string().min(1),
  operation: z.nativeEnum(SyncOperation),
  payload: z.record(z.string(), z.unknown()),
  clientTimestamp: z.number().int().positive(),
  deviceId: z.string().min(1),
  userId: z.string().uuid(),
});

export const SyncBatchRequestSchema = z.object({
  deviceId: z.string().min(1),
  userId: z.string().uuid(),
  lastSyncedTimestamp: z.number().int().nonnegative(),
  changes: z.array(SyncChangeSchema).max(500),
  clientVersion: z.string().min(1),
});
