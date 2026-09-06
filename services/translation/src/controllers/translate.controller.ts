import { Request, Response } from 'express';
import { TranslatorService } from '../services/translator';
import { TranslationRequestSchema } from '@janbhasha/schemas';

export class TranslateController {
  public static async translate(req: Request, res: Response): Promise<void> {
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
  }
}
