import { describe, it, expect } from 'vitest';
import { AuthService } from '../../../services/api/src/services/auth.service';
import { UserRole, AgeGroup } from '@janbhasha/domain';

describe('AuthService Unit Tests', () => {
  it('should register a new user with hashed password and return JWT tokens', async () => {
    const userData = {
      email: 'unit_test@janbhasha.org',
      username: 'unittest_user',
      password: 'SecurePassword123',
      fullName: 'Test Unit User',
      role: UserRole.LEARNER,
      ageGroup: AgeGroup.ADULT,
      nativeLanguage: 'sat',
      targetLanguages: ['sat'],
    };

    const { user, tokens } = await AuthService.register(userData);
    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(tokens.accessToken).toBeDefined();
    expect(tokens.refreshToken).toBeDefined();
  });

  it('should authenticate user with valid credentials and reject invalid ones', async () => {
    const { user, tokens } = await AuthService.login('unit_test@janbhasha.org', 'SecurePassword123');
    expect(user.username).toBe('unittest_user');
    expect(tokens.accessToken).toBeDefined();

    await expect(
      AuthService.login('unit_test@janbhasha.org', 'WrongPassword!'),
    ).rejects.toThrow('Invalid credentials');
  });
});
