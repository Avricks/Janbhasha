import { AuthService } from './auth.service';
import { UserProfile } from '@janbhasha/domain';

export class UserService {
  public static async getProfile(userId: string): Promise<UserProfile> {
    const user = AuthService.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public static async updatePreferences(userId: string, preferences: any): Promise<UserProfile> {
    const user = AuthService.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.preferences = { ...user.preferences, ...preferences };
    user.updatedAt = new Date();
    return user;
  }
}
