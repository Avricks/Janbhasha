import { SupportedLanguage } from '@janbhasha/domain';
import { TranslationMemory } from './translationMemory';

export interface TranslationResponse {
  sourceText: string;
  translatedText: string;
  sourceLanguage: SupportedLanguage;
  targetLanguage: SupportedLanguage;
  cached: boolean;
  confidenceScore: number;
}

export class TranslatorService {
  public static async translate(
    text: string,
    sourceLang: SupportedLanguage,
    targetLang: SupportedLanguage,
    _domain = 'general',
  ): Promise<TranslationResponse> {
    if (sourceLang === targetLang) {
      return {
        sourceText: text,
        translatedText: text,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        cached: true,
        confidenceScore: 1.0,
      };
    }

    // 1. Check translation memory first (exact match)
    const cachedTranslation = TranslationMemory.lookup(text, sourceLang, targetLang);
    if (cachedTranslation) {
      return {
        sourceText: text,
        translatedText: cachedTranslation,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        cached: true,
        confidenceScore: 0.98,
      };
    }

    // 2. Fallback to linguistic rule/dictionary translation
    const words = text.split(/\s+/);
    const translatedWords = words.map((word) => {
      const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
      const lookup = TranslationMemory.lookup(cleanWord, sourceLang, targetLang);
      return lookup ? lookup : `[${word}]`;
    });

    const translatedText = translatedWords.join(' ');
    const hasUnmapped = translatedWords.some((w) => w.startsWith('['));

    return {
      sourceText: text,
      translatedText,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      cached: false,
      confidenceScore: hasUnmapped ? 0.75 : 0.95,
    };
  }
}
