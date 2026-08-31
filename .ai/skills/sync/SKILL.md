---
name: Data Synchronization Skill
description: Implement reliable data sync between offline and online states
applyTo: ["services/sync/**"]
relatedAgent: "offline-agent"
---

# Data Synchronization Skill

## Core Concept

Bidirectional synchronization that maintains eventual consistency while handling offline states, network interruptions, and conflicting edits.

## Sync Protocol

### Phase 1: Collection
```
Client: Collect all unsync changes locally
- Track change operations (CREATE, UPDATE, DELETE)
- Timestamp each change
- Store change metadata
```

### Phase 2: Preparation
```
Client: Prepare sync payload
- Delta: Only changed data
- Compress: Reduce network usage
- Bundle: Group related changes
```

### Phase 3: Transmission
```
Client -> Server: Send payload
Server: Receive and process
- Validate changes
- Apply to server database
- Check for conflicts
- Prepare response
```

### Phase 4: Conflict Resolution
```
Server: Detect conflicts
- Compare timestamps
- Apply conflict resolution strategy
- Return conflict information

Client: Receive resolution
- Apply server updates
- Mark synced changes
- Handle unresolved conflicts
```

### Phase 5: Completion
```
Client: Finalize sync
- Update local state
- Clear sync markers
- Notify user of completion
Server: Cleanup
- Archive sync records
- Update analytics
- Trigger dependent actions
```

## Implementation

### Change Tracking
```kotlin
// Android: Track changes locally
data class LocalChange(
    val id: String,
    val entityType: String, // "lesson", "progress", etc.
    val entityId: String,
    val operation: Operation, // CREATE, UPDATE, DELETE
    val data: Map<String, Any>,
    val timestamp: Long,
    val synced: Boolean = false
)

// Store in Room database
@Dao
interface ChangeDao {
    @Insert
    suspend fun insertChange(change: LocalChange)
    
    @Query("SELECT * FROM changes WHERE synced = 0")
    suspend fun getUnsyncedChanges(): List<LocalChange>
}
```

### Sync Engine
```python
# Backend: Sync engine
class SyncEngine:
    def process_sync(self, client_id: str, payload: Dict):
        """Process incoming sync from client"""
        
        changes = payload['changes']
        client_version = payload['version']
        
        # Validate changes
        for change in changes:
            self.validate_change(change)
        
        # Apply to database
        conflicts = []
        for change in changes:
            try:
                self.apply_change(change)
            except ConflictError as e:
                conflicts.append({
                    'changeId': change['id'],
                    'conflict': e.details
                })
        
        # Prepare response
        server_changes = self.get_server_changes_since(client_version)
        
        return {
            'status': 'success',
            'conflicts': conflicts,
            'serverChanges': server_changes,
            'newVersion': self.current_version
        }
```

### Conflict Resolution
```python
def resolve_conflicts(client_changes: List, 
                      server_changes: List) -> List:
    """Resolve conflicting changes"""
    
    resolved = []
    
    for client_change in client_changes:
        # Find conflicting server change
        server_change = find_conflict(client_change, server_changes)
        
        if not server_change:
            # No conflict, client change wins
            resolved.append(client_change)
            continue
        
        # Conflict: apply resolution strategy
        if client_change['timestamp'] > server_change['timestamp']:
            # Client is newer
            resolved.append(client_change)
        else:
            # Server is newer
            resolved.append(server_change)
            # Log for user review
            log_conflict_for_review(client_change, server_change)
    
    return resolved
```

## Error Handling

### Network Failures
```kotlin
// Retry with exponential backoff
suspend fun syncWithRetry(maxRetries: Int = 3) {
    var attempt = 0
    
    while (attempt < maxRetries) {
        try {
            val result = performSync()
            return result
        } catch (e: NetworkException) {
            attempt++
            if (attempt >= maxRetries) throw e
            
            val delay = 2.0.pow(attempt.toDouble()).toLong() * 1000
            delay(delay)
        }
    }
}
```

### Data Integrity
```python
# Verify sync integrity
def verify_sync_integrity(client_state: Dict, 
                          server_state: Dict) -> bool:
    """Verify data consistency after sync"""
    
    for entity_id, client_data in client_state.items():
        server_data = server_state.get(entity_id)
        
        if not server_data:
            continue
        
        # Compare timestamps
        if client_data['timestamp'] != server_data['timestamp']:
            if client_data['timestamp'] > server_data['timestamp']:
                # Client is newer, needs update
                return False
    
    return True
```

## Performance Optimization

### Delta Sync
```python
# Send only changed fields
def create_delta(current: Dict, previous: Dict) -> Dict:
    """Create delta with only changed fields"""
    delta = {}
    
    for key, value in current.items():
        if key not in previous or previous[key] != value:
            delta[key] = value
    
    return delta
```

### Compression
```python
# Compress sync payload
def compress_payload(payload: Dict) -> bytes:
    import gzip
    json_str = json.dumps(payload)
    return gzip.compress(json_str.encode())
```

### Batching
```python
# Batch multiple operations
def batch_changes(changes: List, batch_size: int = 100) -> List:
    """Group changes into batches"""
    batches = []
    for i in range(0, len(changes), batch_size):
        batches.append(changes[i:i + batch_size])
    return batches
```

## Testing Strategies

### Offline Simulation
- Simulate no network
- Simulate poor connectivity
- Simulate interruptions
- Verify local changes persist

### Conflict Testing
- Create conflicting edits
- Test resolution strategies
- Verify data consistency
- Test user notification

### Performance Testing
- Sync large payloads
- Test with many changes
- Measure bandwidth usage
- Monitor battery impact

---

See rules/05-offline.md and offline-agent.md for more details.
