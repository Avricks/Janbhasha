import jwt from 'jsonwebtoken';
import { config } from '../config';
import { hashStringSha256 } from '@janbhasha/shared';
import { UserRole, AgeGroup, UserProfile } from '@janbhasha/domain';

// In-memory user store for demo/development when DB is not actively running
const memoryUsers = new Map<string, any>();

export class AuthService {
  public static async register(data: any): Promise<{ user: UserProfile; tokens: any }> {
    const existing = Array.from(memoryUsers.values()).find(
      (u) => u.email === data.email || u.username === data.username,
    );
    if (existing) {
      throw new Error('User with this email or username already exists');
    }

    const userId = `usr_${Date.now()}`;
    const passwordHash = hashStringSha256(data.password);

    const newUser: UserProfile = {
      id: userId,
      email: data.email,
      username: data.username,
      fullName: data.fullName,
      role: data.role || UserRole.LEARNER,
      ageGroup: data.ageGroup || AgeGroup.ADULT,
      nativeLanguage: data.nativeLanguage,
      targetLanguages: data.targetLanguages || ['sat'],
      preferences: {
        theme: 'system',
        preferredLanguage: data.nativeLanguage,
        audioPlaybackSpeed: 1.0,
        fontSize: 16,
        highContrast: false,
        reducedMotion: false,
        offlineDownloadsEnabled: true,
        soundEffectsEnabled: true,
      },
      isEmailVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    memoryUsers.set(userId, { ...newUser, passwordHash });

    const tokens = this.generateTokens(newUser);
    return { user: newUser, tokens };
  }

  public static async login(emailOrUsername: string, password: string): Promise<{ user: UserProfile; tokens: any }> {
    const user = Array.from(memoryUsers.values()).find(
      (u) => u.email === emailOrUsername || u.username === emailOrUsername,
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordHash = hashStringSha256(password);
    if (user.passwordHash !== passwordHash) {
      throw new Error('Invalid credentials');
    }

    const { passwordHash: _, ...userProfile } = user;
    const tokens = this.generateTokens(userProfile);
    return { user: userProfile, tokens };
  }

  public static generateTokens(user: UserProfile) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }

  public static verifyRefreshToken(token: string): any {
    return jwt.verify(token, config.jwtRefreshSecret);
  }

  public static getUserById(id: string): UserProfile | null {
    const user = memoryUsers.get(id);
    if (!user) return null;
    const { passwordHash: _, ...profile } = user;
    return profile;
  }
}
