import { describe, it, expect } from 'vitest';
import { ConflictResolver } from '../../services/sync/src/services/conflictResolver';
import { SyncOperation, ConflictResolutionStrategy } from '@janbhasha/domain';

describe('Offline Sync Conflict Resolution Tests', () => {
  it('should apply Last-Write-Wins based on client/server timestamps', () => {
    const clientChange = {
      id: 'chg_01',
      entityType: 'lesson' as const,
      entityId: 'les_01',
      operation: SyncOperation.UPDATE,
      payload: { progressPercent: 100 },
      clientTimestamp: 2000,
      deviceId: 'dev_phone',
      userId: 'usr_01',
    };

    const serverChange = {
      id: 'chg_00',
      entityType: 'lesson' as const,
      entityId: 'les_01',
      operation: SyncOperation.UPDATE,
      payload: { progressPercent: 50 },
      clientTimestamp: 1000,
      deviceId: 'dev_tablet',
      userId: 'usr_01',
    };

    const resolved = ConflictResolver.resolve(clientChange, serverChange, ConflictResolutionStrategy.SERVER_WINS);
    // Client has newer timestamp (2000 > 1000), so LWW keeps client payload
    expect(resolved.resolvedPayload).toEqual({ progressPercent: 100 });
  });
});
