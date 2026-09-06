import { Router } from 'express';
import { SpeechController } from '../controllers/speech.controller';

const router = Router();

router.post('/transcribe', SpeechController.transcribe);
router.post('/synthesize', SpeechController.synthesize);

export default router;
