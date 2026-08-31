# API Design & Implementation Rules

## REST API Principles

### 1. URL Structure
- Resource-based URLs (nouns, not verbs)
- Hierarchical paths for relationships
- Version in URL (v1, v2)
- Clear, consistent naming
- Lowercase with hyphens

Example: `/v1/users/{userId}/lessons/{lessonId}`

### 2. HTTP Methods
- GET: Retrieve resources (idempotent)
- POST: Create new resources
- PUT: Full replacement of resources
- PATCH: Partial updates
- DELETE: Remove resources

### 3. Status Codes
- 2xx Success: 200 OK, 201 Created, 204 No Content
- 3xx Redirect: 301 Moved, 304 Not Modified
- 4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 5xx Server Error: 500 Internal Error, 503 Service Unavailable

### 4. Request/Response Format
- JSON for request/response bodies
- Clear error messages with error codes
- Consistent timestamp format (ISO 8601)
- Consistent pagination (limit, offset/cursor)

## API Documentation

### OpenAPI/Swagger
- Complete API documentation
- All endpoints documented
- Request/response schemas
- Error responses documented
- Example requests/responses

### Documentation Standards
- Clear descriptions
- Parameter documentation
- Authentication requirements
- Rate limiting information
- Deprecation notices

## Versioning Strategy

### API Versioning
- Semantic versioning for APIs
- Backward compatibility maintained
- Deprecation timeline (minimum 6 months)
- Migration guides provided
- Version support matrix

### Breaking Changes
- Documented in changelog
- Migration guide provided
- Deprecation warnings
- Sufficient transition period
- Support for multiple versions

## Rate Limiting & Throttling

### Rate Limit Policy
- Per-user rate limits
- Burst allowance
- Tiered limits by user type
- Clear rate limit headers
- Clear error responses

### Retry Strategy
- Exponential backoff
- Jitter implementation
- Maximum retry attempts
- Clear retry-after headers

## Security in APIs

### Authentication
- Bearer token authentication
- Token validation on each request
- Token expiration handling
- Refresh token mechanism
- Secure token storage

### Authorization
- Resource-level authorization
- Role-based access control
- Scope-based permissions
- Authorization header validation

### Input Validation
- Request schema validation
- Input sanitization
- File upload restrictions
- Size limits
- Type checking

## API Monitoring

### Logging
- All requests logged
- Response times tracked
- Error details captured
- User activity tracking
- Data sensitivity considerations

### Metrics
- Request volume
- Error rates
- Response time percentiles
- Endpoint popularity
- Performance trends

---

See backend-agent.md and api/SKILL.md for implementation.
