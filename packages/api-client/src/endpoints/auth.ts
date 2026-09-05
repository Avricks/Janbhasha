import { ApiClient } from '../client';
import { UserProfile } from '@janbhasha/domain';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: UserProfile;
  tokens: AuthTokens;
}

export class AuthEndpoint {
  constructor(private client: ApiClient) {}

  public async login(emailOrUsername: string, password: string): Promise<AuthResponse> {
    return this.client.post<AuthResponse>('/api/v1/auth/login', {
      emailOrUsername,
      password,
    });
  }

  public async register(userData: Record<string, unknown>): Promise<AuthResponse> {
    return this.client.post<AuthResponse>('/api/v1/auth/register', userData);
  }

  public async refreshToken(refreshToken: string): Promise<AuthTokens> {
    return this.client.post<AuthTokens>('/api/v1/auth/refresh', { refreshToken });
  }

  public async logout(): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/api/v1/auth/logout');
  }

  public async getProfile(): Promise<UserProfile> {
    return this.client.get<UserProfile>('/api/v1/users/me');
  }
}
