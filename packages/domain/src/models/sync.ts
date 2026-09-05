/**
 * Offline Sync and Change Tracking Domain Models
 */

export enum SyncOperation {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface SyncChange {
  id: string;
  entityType: 'lesson' | 'learning_record' | 'quiz_result' | 'user_preference' | 'note';
  entityId: string;
  operation: SyncOperation;
  payload: Record<string, unknown>;
  clientTimestamp: number;
  deviceId: string;
  userId: string;
}

export enum ConflictResolutionStrategy {
  CLIENT_WINS = 'client_wins',
  SERVER_WINS = 'server_wins',
  MERGE = 'merge',
  MANUAL_REVIEW = 'manual_review',
}

export interface ConflictRecord {
  changeId: string;
  entityType: string;
  entityId: string;
  clientPayload: Record<string, unknown>;
  serverPayload: Record<string, unknown>;
  clientTimestamp: number;
  serverTimestamp: number;
  resolutionStrategy: ConflictResolutionStrategy;
  resolvedPayload?: Record<string, unknown>;
  resolvedAt?: Date;
}

export interface SyncRequestPayload {
  deviceId: string;
  userId: string;
  lastSyncedTimestamp: number;
  changes: SyncChange[];
  clientVersion: string;
}

export interface SyncResponsePayload {
  status: 'success' | 'partial_success' | 'error';
  serverTimestamp: number;
  appliedChangeIds: string[];
  serverUpdates: SyncChange[];
  conflicts: ConflictRecord[];
  message?: string;
}
