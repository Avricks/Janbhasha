import { ApiClient } from '../client';
import { SupportedLanguage } from '@janbhasha/domain';

export interface TranslationResult {
  sourceText: string;
  translatedText: string;
  sourceLanguage: SupportedLanguage;
  targetLanguage: SupportedLanguage;
  cached: boolean;
  confidenceScore?: number;
}

export class TranslationEndpoint {
  constructor(private client: ApiClient) {}

  public async translate(
    text: string,
    sourceLanguage: SupportedLanguage,
    targetLanguage: SupportedLanguage,
  ): Promise<TranslationResult> {
    return this.client.post<TranslationResult>('/api/v1/translation/translate', {
      text,
      sourceLanguage,
      targetLanguage,
    });
  }
}
