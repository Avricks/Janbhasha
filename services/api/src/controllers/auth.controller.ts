import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  public static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { emailOrUsername, password } = req.body;
      const result = await AuthService.login(emailOrUsername, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  public static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const decoded = AuthService.verifyRefreshToken(refreshToken);
      const user = AuthService.getUserById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'Invalid token: user not found' });
      }
      const tokens = AuthService.generateTokens(user);
      res.json(tokens);
    } catch (error: any) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }

  public static async logout(_req: Request, res: Response) {
    res.json({ success: true, message: 'Logged out successfully' });
  }
}
