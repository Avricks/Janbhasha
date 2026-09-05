import { Router, Request, Response } from 'express';
import { TranscriptionService } from '../services/transcription';
import { SynthesisService } from '../services/synthesis';
import { SpeechTranscribeRequestSchema, SpeechSynthesizeRequestSchema } from '@janbhasha/schemas';

const router = Router();

router.post('/transcribe', async (req: Request, res: Response) => {
  try {
    const parsed = SpeechTranscribeRequestSchema.parse(req.body);
    const result = await TranscriptionService.transcribe(
      parsed.audioBase64 || '',
      parsed.language,
    );
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/synthesize', async (req: Request, res: Response) => {
  try {
    const parsed = SpeechSynthesizeRequestSchema.parse(req.body);
    const result = await SynthesisService.synthesize(
      parsed.text,
      parsed.language,
      parsed.voiceGender,
      parsed.speed,
    );
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
