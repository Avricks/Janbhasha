# Architecture Rules for Janbhasha

## Architectural Principles

### 1. Microservices Separation
- Each service has a single responsibility
- Services communicate via APIs (REST or gRPC)
- Independent deployment and scaling
- Service-specific databases (data isolation)

### 2. API Design
- RESTful design principles
- Clear versioning (v1, v2)
- Consistent error responses
- Comprehensive API documentation
- Rate limiting and throttling

### 3. Data Management
- PostgreSQL for primary data store
- Redis for caching and sessions
- Vector DB for semantic search
- Data consistency rules across services
- Transaction handling for multi-service operations

### 4. Dependency Management
- Minimal external dependencies
- Prefer well-maintained libraries
- Version pinning for stability
- Regular dependency updates
- License compatibility verification

### 5. Scalability
- Stateless API design
- Horizontal scaling capability
- Database connection pooling
- Caching strategies
- Load balancing ready

### 6. Resilience
- Graceful degradation
- Circuit breaker patterns
- Retry logic with exponential backoff
- Fallback mechanisms
- Health check endpoints

### 7. Monitoring & Observability
- Structured logging
- Distributed tracing
- Performance metrics
- Error tracking
- Health monitoring

### 8. Infrastructure as Code
- All infrastructure in version control
- Terraform or equivalent for IaC
- Environment parity (dev, staging, prod)
- Automated deployment pipelines

## Service Boundaries

### Core Services
- **API Service**: Main orchestration
- **Translation Service**: Language model inference
- **Speech Service**: Audio processing
- **Content Service**: Learning material management
- **Assessment Service**: Quiz and evaluation
- **Sync Service**: Offline data synchronization

### Supporting Services
- **Auth Service**: Authentication and authorization
- **Notification Service**: User communications
- **Analytics Service**: Learner metrics
- **Admin Service**: System management

## Technology Stack Guidelines

### Backend
- **Language**: Node.js or Python
- **Framework**: Express/Fastify or FastAPI
- **Database**: PostgreSQL
- **Cache**: Redis
- **Message Queue**: RabbitMQ or Kafka

### Frontend
- **Web**: React or Vue.js
- **Mobile**: Native Android (Kotlin)
- **UI Framework**: Material Design

### AI/ML
- **Training**: PyTorch or TensorFlow
- **Serving**: TensorFlow Serving or ONNX Runtime
- **Orchestration**: Python with task queues

---

See other rule files for specific domain rules.
