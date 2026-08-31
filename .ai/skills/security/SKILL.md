---
name: Security Implementation Skill
description: Implement security best practices across the platform
applyTo: ["services/", "apps/"]
relatedAgent: "security-agent"
---

# Security Implementation Skill

## Authentication System

### JWT Implementation
```python
from datetime import datetime, timedelta
import jwt

def create_tokens(user_id: str) -> dict:
    """Create access and refresh tokens"""
    
    access_payload = {
        "sub": user_id,
        "type": "access",
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    
    refresh_payload = {
        "sub": user_id,
        "type": "refresh",
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    
    access_token = jwt.encode(
        access_payload,
        SECRET_KEY,
        algorithm="HS256"
    )
    
    refresh_token = jwt.encode(
        refresh_payload,
        REFRESH_SECRET_KEY,
        algorithm="HS256"
    )
    
    return {
        "accessToken": access_token,
        "refreshToken": refresh_token,
        "expiresIn": 3600
    }

def verify_token(token: str) -> dict:
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise AuthenticationError("Token expired")
    except jwt.InvalidTokenError:
        raise AuthenticationError("Invalid token")
```

### Password Security
```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash password with Argon2"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return pwd_context.verify(plain_password, hashed)

# Password validation
def validate_password(password: str) -> bool:
    """Validate password strength"""
    if len(password) < 12:
        return False
    if not any(c.isupper() for c in password):
        return False
    if not any(c.isdigit() for c in password):
        return False
    if not any(c in "!@#$%^&*" for c in password):
        return False
    return True
```

## Data Encryption

### Encryption at Rest
```python
from cryptography.fernet import Fernet
import os

# Generate key (store securely)
encryption_key = os.environ.get("ENCRYPTION_KEY")
cipher_suite = Fernet(encryption_key)

def encrypt_data(data: str) -> str:
    """Encrypt sensitive data"""
    return cipher_suite.encrypt(data.encode()).decode()

def decrypt_data(encrypted_data: str) -> str:
    """Decrypt sensitive data"""
    return cipher_suite.decrypt(encrypted_data.encode()).decode()

# Usage
encrypted_ssn = encrypt_data(user_ssn)
database.save_encrypted(encrypted_ssn)

# Retrieve
encrypted = database.get_encrypted()
original_ssn = decrypt_data(encrypted)
```

### Encryption in Transit
```python
# Enforce HTTPS
from fastapi_cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://janbhasha.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    https_only=True
)

# SSL/TLS configuration
# Use TLS 1.3+ with strong ciphers
SECURE_PROTOCOL = "TLSv1_3"
SECURE_CIPHERS = [
    "TLS_AES_256_GCM_SHA384",
    "TLS_CHACHA20_POLY1305_SHA256",
    "TLS_AES_128_GCM_SHA256"
]
```

## Authorization & Access Control

### Role-Based Access Control
```python
from enum import Enum

class UserRole(Enum):
    ADMIN = "admin"
    TEACHER = "teacher"
    LEARNER = "learner"
    GUEST = "guest"

def require_role(*allowed_roles):
    """Decorator for role-based access"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            user = get_current_user()
            if user.role not in allowed_roles:
                raise PermissionError("Insufficient permissions")
            return await func(*args, **kwargs)
        return wrapper
    return decorator

# Usage
@app.post("/admin/users")
@require_role(UserRole.ADMIN)
async def create_user(user_data: dict):
    # Only admins can create users
    pass
```

### Resource-Level Authorization
```python
def can_access_lesson(user_id: str, lesson_id: str) -> bool:
    """Check if user can access lesson"""
    
    user = User.get(user_id)
    lesson = Lesson.get(lesson_id)
    
    # Public lessons
    if lesson.is_public:
        return True
    
    # Enrolled learners
    if user.role == UserRole.LEARNER:
        return lesson in user.enrolled_courses
    
    # Teachers own course
    if user.role == UserRole.TEACHER:
        return lesson.teacher_id == user_id
    
    # Admins can access everything
    if user.role == UserRole.ADMIN:
        return True
    
    return False
```

## Input Validation

### Sanitization
```python
from bleach import clean

def sanitize_text(text: str) -> str:
    """Sanitize user input to prevent XSS"""
    allowed_tags = ['p', 'br', 'strong', 'em', 'u']
    allowed_attributes = {}
    return clean(text, tags=allowed_tags, 
                 attributes=allowed_attributes)

# Usage
user_comment = sanitize_text(request.comment)
```

### Schema Validation
```python
from pydantic import BaseModel, validator

class LessonCreate(BaseModel):
    title: str
    content: str
    language: str
    
    @validator('title')
    def title_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Title cannot be empty')
        return v
    
    @validator('language')
    def language_valid(cls, v):
        valid_languages = ['santhali', 'mundari', 'ho']
        if v not in valid_languages:
            raise ValueError(f'Language must be one of {valid_languages}')
        return v
```

## Security Monitoring

### Logging
```python
import logging

logger = logging.getLogger(__name__)

def log_auth_attempt(user_id: str, success: bool, method: str):
    """Log authentication attempts"""
    logger.info(f"Auth attempt: user={user_id}, success={success}, method={method}")

def log_access(user_id: str, resource: str, action: str):
    """Log resource access"""
    logger.info(f"Access: user={user_id}, resource={resource}, action={action}")
```

### Rate Limiting
```python
from slowapi import Limiter

limiter = Limiter(key_func=get_remote_address)

@app.post("/login")
@limiter.limit("5/minute")
async def login(credentials: dict):
    """Rate limit login attempts"""
    pass

@app.get("/api/lessons")
@limiter.limit("100/minute")
async def get_lessons():
    """Rate limit API access"""
    pass
```

## Vulnerability Scanning

### Dependency Scanning
```bash
# Check for known vulnerabilities
npm audit
pip check
cargo audit
```

### Code Analysis
```bash
# Static analysis
pylint *.py
eslint *.js
sonarqube analysis
```

## Compliance

### GDPR Compliance
```python
def delete_user_data(user_id: str):
    """Implement right to deletion"""
    
    # Delete personal data
    User.delete(user_id)
    
    # Delete learning records
    LearningRecord.delete_by_user(user_id)
    
    # Delete assessment results
    AssessmentResult.delete_by_user(user_id)
    
    # Log deletion
    logger.info(f"User data deleted: {user_id}")
    
    # Archive for compliance
    archive_gdpr_deletion(user_id)
```

### COPPA Compliance
```python
def create_child_account(parent_email: str, child_data: dict) -> dict:
    """Create account for under-13 with parental consent"""
    
    # Require parental email verification
    send_parental_consent_email(parent_email)
    
    if not verify_parental_consent(parent_email):
        raise PermissionError("Parental consent required")
    
    # Create with restrictions
    user = User.create(
        **child_data,
        age_group="under_13",
        limited_data_collection=True,
        no_behavioral_targeting=True
    )
    
    return user
```

---

See rules/06-security.md and security-agent.md for detailed security guidelines.
