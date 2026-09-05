import {
  SyncRequestPayload,
  SyncResponsePayload,
  SyncChange,
  ConflictRecord,
} from '@janbhasha/domain';

// Simulated server state storage
const serverStateStore = new Map<string, SyncChange>();

export class SyncEngine {
  public static async processSync(payload: SyncRequestPayload): Promise<SyncResponsePayload> {
    const appliedChangeIds: string[] = [];
    const conflicts: ConflictRecord[] = [];
    const serverTimestamp = Date.now();

    for (const clientChange of payload.changes) {
      const key = `${clientChange.entityType}:${clientChange.entityId}`;
      const existing = serverStateStore.get(key);

      if (existing && existing.clientTimestamp > clientChange.clientTimestamp) {
        // Conflict: server has newer edit
        conflicts.push({
          changeId: clientChange.id,
          entityType: clientChange.entityType,
          entityId: clientChange.entityId,
          clientPayload: clientChange.payload,
          serverPayload: existing.payload,
          clientTimestamp: clientChange.clientTimestamp,
          serverTimestamp: existing.clientTimestamp,
          resolutionStrategy: 'server_wins' as any,
          resolvedPayload: existing.payload,
          resolvedAt: new Date(),
        });
      } else {
        // Accept and record change
        serverStateStore.set(key, clientChange);
        appliedChangeIds.push(clientChange.id);
      }
    }

    // Collect server updates that occurred after client's lastSyncedTimestamp
    const serverUpdates: SyncChange[] = [];
    for (const [_k, change] of serverStateStore.entries()) {
      if (
        change.userId === payload.userId &&
        change.clientTimestamp > payload.lastSyncedTimestamp &&
        !appliedChangeIds.includes(change.id)
      ) {
        serverUpdates.push(change);
      }
    }

    return {
      status: conflicts.length > 0 ? 'partial_success' : 'success',
      serverTimestamp,
      appliedChangeIds,
      serverUpdates,
      conflicts,
    };
  }

  public static async getChangesSince(timestamp: number): Promise<SyncResponsePayload> {
    const serverUpdates: SyncChange[] = [];
    for (const [_k, change] of serverStateStore.entries()) {
      if (change.clientTimestamp > timestamp) {
        serverUpdates.push(change);
      }
    }

    return {
      status: 'success',
      serverTimestamp: Date.now(),
      appliedChangeIds: [],
      serverUpdates,
      conflicts: [],
    };
  }
}
