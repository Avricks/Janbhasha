import { Request, Response } from 'express';
import { SyncEngine } from '../services/syncEngine';
import { SyncBatchRequestSchema } from '@janbhasha/schemas';

export class SyncController {
  public static async processSync(req: Request, res: Response): Promise<void> {
    try {
      const parsed = SyncBatchRequestSchema.parse(req.body);
      const result = await SyncEngine.processSync(parsed);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async getChanges(req: Request, res: Response): Promise<void> {
    const since = parseInt((req.query.since as string) || '0', 10);
    const result = await SyncEngine.getChangesSince(since);
    res.json(result);
  }
}
