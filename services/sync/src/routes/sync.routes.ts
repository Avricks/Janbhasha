import { Router } from 'express';
import { SyncController } from '../controllers/sync.controller';

const router = Router();

router.post('/', SyncController.processSync);
router.get('/changes', SyncController.getChanges);

export default router;
