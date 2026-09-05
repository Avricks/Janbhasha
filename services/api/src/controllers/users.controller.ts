import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UsersController {
  public static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const user = await UserService.getProfile(req.user.id);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  public static async updatePreferences(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const updated = await UserService.updatePreferences(req.user.id, req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
