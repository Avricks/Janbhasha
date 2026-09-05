import { Router, Request, Response } from 'express';
import { TranslatorService } from '../services/translator';
import { TranslationRequestSchema } from '@janbhasha/schemas';

const router = Router();

router.post('/translate', async (req: Request, res: Response) => {
  try {
    const parsed = TranslationRequestSchema.parse(req.body);
    const result = await TranslatorService.translate(
      parsed.text,
      parsed.sourceLanguage,
      parsed.targetLanguage,
      parsed.domain,
    );
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
