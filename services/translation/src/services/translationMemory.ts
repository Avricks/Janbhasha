import { SupportedLanguage } from '@janbhasha/domain';

interface MemoryEntry {
  sourceText: string;
  translatedText: string;
  sourceLang: SupportedLanguage;
  targetLang: SupportedLanguage;
  domain: string;
}

// Built-in verified translation pairs
const translationMemoryStore: MemoryEntry[] = [
  {
    sourceText: 'hello',
    translatedText: 'ᱡᱚᱦᱟᱨ (Johar)',
    sourceLang: SupportedLanguage.ENGLISH,
    targetLang: SupportedLanguage.SANTHALI,
    domain: 'general',
  },
  {
    sourceText: 'good morning',
    translatedText: 'ᱥᱟᱜᱩᱱ ᱥᱮᱛᱟᱜ (Sagun Setag)',
    sourceLang: SupportedLanguage.ENGLISH,
    targetLang: SupportedLanguage.SANTHALI,
    domain: 'general',
  },
  {
    sourceText: 'thank you',
    translatedText: 'ᱥᱟᱨᱦᱟᱣ (Sarhao)',
    sourceLang: SupportedLanguage.ENGLISH,
    targetLang: SupportedLanguage.SANTHALI,
    domain: 'general',
  },
  {
    sourceText: 'one',
    translatedText: 'ᱢᱤᱫ (Mit)',
    sourceLang: SupportedLanguage.ENGLISH,
    targetLang: SupportedLanguage.SANTHALI,
    domain: 'general',
  },
  {
    sourceText: 'hello',
    translatedText: 'ᱡᱚᱦᱟᱨ (Johar)',
    sourceLang: SupportedLanguage.ENGLISH,
    targetLang: SupportedLanguage.MUNDARI,
    domain: 'general',
  },
  {
    sourceText: 'one',
    translatedText: 'ᱢᱤᱭᱟᱹᱫᱽ (Miyad)',
    sourceLang: SupportedLanguage.ENGLISH,
    targetLang: SupportedLanguage.MUNDARI,
    domain: 'general',
  },
  {
    sourceText: 'hello',
    translatedText: '𑢹𑣉 ᱡᱚᱦᱟᱨ (Johar)',
    sourceLang: SupportedLanguage.ENGLISH,
    targetLang: SupportedLanguage.HO,
    domain: 'general',
  },
  {
    sourceText: 'one',
    translatedText: '𑣡 (Miyad)',
    sourceLang: SupportedLanguage.ENGLISH,
    targetLang: SupportedLanguage.HO,
    domain: 'general',
  },
];

export class TranslationMemory {
  public static lookup(
    text: string,
    sourceLang: SupportedLanguage,
    targetLang: SupportedLanguage,
  ): string | null {
    const normalized = text.trim().toLowerCase();
    const match = translationMemoryStore.find(
      (entry) =>
        entry.sourceLang === sourceLang &&
        entry.targetLang === targetLang &&
        entry.sourceText.toLowerCase() === normalized,
    );
    return match ? match.translatedText : null;
  }

  public static add(entry: MemoryEntry): void {
    translationMemoryStore.push(entry);
  }
}
