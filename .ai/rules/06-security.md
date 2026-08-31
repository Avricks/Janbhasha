# Security & Data Protection Rules

## Authentication & Authorization

### 1. Authentication Mechanism
- JWT-based token authentication
- Refresh token rotation
- Secure password hashing (bcrypt/Argon2)
- Multi-factor authentication optional
- Session management

### 2. Authorization
- Role-based access control (RBAC)
- Permission-based fine-grained access
- Resource-level authorization
- Regular permission audits
- Privilege escalation prevention

### 3. Password Policy
- Minimum 12 characters
- Complexity requirements
- Regular change not enforced
- Breach detection integration
- Secure recovery mechanisms

## Data Protection

### Encryption
- TLS 1.3+ for all communications
- AES-256 for sensitive data at rest
- End-to-end encryption where applicable
- Key management and rotation
- Secure key storage

### Data Classification
- Public: Non-sensitive data
- Internal: System operational data
- Confidential: User personal information
- Restricted: Highly sensitive data (auth tokens, etc.)

### Data Retention
- Define retention periods per data type
- Automated deletion mechanisms
- Secure purging procedures
- Right to deletion implementation
- Audit trails

## Privacy & Compliance

### GDPR Compliance
- Lawful basis documentation
- Consent management
- Data subject rights (access, deletion)
- Privacy impact assessments
- Data protection officer oversight

### COPPA Compliance (Child Safety)
- Age gating for under-13 users
- Parental consent mechanisms
- Limited data collection
- No targeted advertising
- Regular compliance audits

### Data Minimization
- Collect only necessary data
- Regular data audit
- Anonymization where possible
- Pseudonymization strategies
- Data sharing restrictions

## Security Practices

### Vulnerability Management
- Regular security scanning
- Dependency vulnerability checks
- Penetration testing
- Code review for security
- Bug bounty programs

### Incident Response
- Incident response plan
- Security incident logging
- Breach notification procedures
- Recovery procedures
- Post-incident analysis

### Security Monitoring
- Intrusion detection
- Access logging
- Audit trails
- Security alerts
- Regular security reviews

## Third-Party Security

- Vendor security assessment
- Data processing agreements
- Regular vendor audits
- Liability clauses
- Termination procedures

---

See security-agent.md and security/SKILL.md for implementation details.
