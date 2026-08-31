---
name: Offline-First Architecture Skill
description: Design and implement offline-first systems with data synchronization
applyTo: ["services/sync/**", "packages/"]
relatedAgent: "offline-agent"
---

# Offline-First Architecture Skill

## Overview

This skill addresses the core challenge of providing reliable offline functionality while maintaining data consistency through intelligent synchronization.

## Core Principles

### Offline-First Design
1. **Assume offline**: Design features to work without connectivity
2. **Progressive enhancement**: Add online features when connected
3. **Transparent sync**: Background synchronization with user awareness
4. **Eventual consistency**: Data becomes consistent over time

### Key Patterns
- **CQRS**: Command Query Responsibility Segregation
- **Event Sourcing**: Track all changes
- **Conflict-free Replicated Data Types (CRDTs)**: Automatic conflict resolution
- **Optimistic Updates**: Update UI immediately, sync in background

## Synchronization Strategy

### Change Tracking
```json
{
  "id": "change-123",
  "entity": "lesson",
  "entityId": "lesson-456",
  "operation": "update",
  "data": { "lastViewed": "2024-01-15T10:30:00Z" },
  "timestamp": "2024-01-15T10:30:00Z",
  "deviceId": "device-789"
}
```

### Sync Protocol
1. Collect offline changes
2. Check connectivity
3. Prepare sync payload (delta)
4. Compress for bandwidth
5. Send to server
6. Receive updates
7. Resolve conflicts
8. Update local state

### Conflict Resolution

**Last-Write-Wins**:
```
Local: timestamp = 2024-01-15T10:30:00Z, value = "A"
Server: timestamp = 2024-01-15T10:29:00Z, value = "B"
Result: Keep Local (newer)
```

**Merge Strategies**:
- Array merges (combine elements)
- Map merges (combine fields)
- Custom merge logic

## Implementation Examples

### Local Change Tracking
```kotlin
// Track changes locally
data class SyncChange(
    val id: String,
    val entityType: String,
    val operation: Operation, // CREATE, UPDATE, DELETE
    val data: Map<String, Any>,
    val timestamp: Long
)
```

### Sync Engine
```kotlin
// Perform sync
suspend fun syncChanges() {
    val changes = getUnsyncedChanges()
    val delta = createDelta(changes)
    val compressed = compress(delta)
    
    val response = api.uploadChanges(compressed)
    resolveConflicts(response.conflicts)
    applyServerUpdates(response.updates)
}
```

### Offline Availability
```kotlin
// Features per connectivity state
sealed class FeatureState {
    object Offline : FeatureState()
    object Syncing : FeatureState()
    object Online : FeatureState()
}
```

## Data Storage

### SQLite Schema
```sql
CREATE TABLE changes (
    id TEXT PRIMARY KEY,
    entity_type TEXT,
    entity_id TEXT,
    operation TEXT,
    data JSON,
    timestamp LONG,
    synced BOOLEAN
);
```

### Storage Optimization
- Compress old data
- Archive completed lessons
- Delete synchronized changes
- Limit local storage size

## Network Handling

### Connectivity Detection
```kotlin
// Monitor connectivity
val isConnected = isNetworkAvailable()
val bandwidth = estimateBandwidth()
val signalStrength = getSignalStrength()
```

### Sync Triggering
- Manual sync on demand
- Automatic sync on connectivity change
- Periodic background sync
- High-priority sync for critical data

## Testing Offline Scenarios

### Network Simulation
- Simulate offline environment
- Test connectivity transitions
- Test poor network conditions
- Test conflict scenarios

### Verification
- Verify local data persistence
- Verify conflict resolution
- Verify data consistency
- Verify sync completeness

## Performance Considerations

- Minimize sync payload size
- Batch operations
- Prioritize sync items
- Implement rate limiting
- Monitor battery usage

---

See rules/05-offline.md and offline-agent.md for more details.
