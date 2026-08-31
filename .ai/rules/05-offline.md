# Offline Functionality Rules

## Offline-First Design Principles

### 1. Core Functionality Offline
- Essential features work without internet
- Lessons accessible offline
- Assessments can be taken offline
- Progress is tracked locally
- User experience consistent

### 2. Data Synchronization
- Bi-directional sync mechanism
- Change tracking for offline edits
- Conflict resolution strategies
- Bandwidth optimization
- Eventual consistency model

### 3. Local Storage
- SQLite for structured data
- File storage for large assets
- Efficient data compression
- Space management
- Backup mechanisms

### 4. Progressive Enhancement
- Core offline features always available
- Online features gracefully added when connected
- Feature detection for connectivity
- Graceful degradation
- User transparency about capabilities

### 5. Conflict Resolution
- Last-write-wins strategy (with warnings)
- Merge algorithms for complex conflicts
- User-guided resolution when needed
- Conflict logging for debugging
- Consistency validation

## Sync Architecture

### Change Tracking
- Timestamp-based tracking
- Operation logging
- Device identification
- User action attribution
- Transaction support

### Sync Protocol
- Efficient delta sync
- Compression for bandwidth
- Resumable transfers
- Retry logic with backoff
- Sync status tracking

### Offline Content
- Essential lessons pre-downloaded
- Language pack support
- Selective sync options
- Storage space management
- Version management

## Network Connectivity

### Detection & Monitoring
- Connectivity status detection
- Network type identification
- Bandwidth estimation
- Connection stability monitoring
- Automatic sync triggering

### Optimization Strategies
- Lazy loading
- Batch operations
- Request prioritization
- Caching strategies
- Resource pooling

## User Communication

- Clear offline/online status indicators
- Sync status transparency
- Conflict notifications
- Storage space warnings
- Feature availability clarity

---

See offline-agent.md and offline-ai/SKILL.md for implementation.
