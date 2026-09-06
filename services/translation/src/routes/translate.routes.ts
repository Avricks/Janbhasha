import { Router } from 'express';
import { TranslateController } from '../controllers/translate.controller';

const router = Router();

router.post('/translate', TranslateController.translate);

export default router;
