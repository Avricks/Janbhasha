import { SyncChange, ConflictRecord, ConflictResolutionStrategy } from '@janbhasha/domain';

export class ConflictResolver {
  public static resolve(
    clientChange: SyncChange,
    serverChange: SyncChange,
    strategy: ConflictResolutionStrategy = ConflictResolutionStrategy.SERVER_WINS,
  ): ConflictRecord {
    let resolvedPayload = serverChange.payload;

    if (strategy === ConflictResolutionStrategy.CLIENT_WINS) {
      resolvedPayload = clientChange.payload;
    } else if (strategy === ConflictResolutionStrategy.MERGE) {
      resolvedPayload = {
        ...serverChange.payload,
        ...clientChange.payload,
      };
    } else if (clientChange.clientTimestamp > serverChange.clientTimestamp) {
      // Last-Write-Wins
      resolvedPayload = clientChange.payload;
    }

    return {
      changeId: clientChange.id,
      entityType: clientChange.entityType,
      entityId: clientChange.entityId,
      clientPayload: clientChange.payload,
      serverPayload: serverChange.payload,
      clientTimestamp: clientChange.clientTimestamp,
      serverTimestamp: serverChange.clientTimestamp,
      resolutionStrategy: strategy,
      resolvedPayload,
      resolvedAt: new Date(),
    };
  }
}
