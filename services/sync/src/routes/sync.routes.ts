import { Router, Request, Response } from 'express';
import { SyncEngine } from '../services/syncEngine';
import { SyncBatchRequestSchema } from '@janbhasha/schemas';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = SyncBatchRequestSchema.parse(req.body);
    const result = await SyncEngine.processSync(parsed);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/changes', async (req: Request, res: Response) => {
  const since = parseInt((req.query.since as string) || '0', 10);
  const result = await SyncEngine.getChangesSince(since);
  res.json(result);
});

export default router;
