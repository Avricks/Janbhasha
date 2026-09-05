import { SupportedLanguage, WritingScript, LanguageMetadata } from '@janbhasha/domain';

export const SUPPORTED_LANGUAGES_METADATA: Record<SupportedLanguage, LanguageMetadata> = {
  [SupportedLanguage.SANTHALI]: {
    id: SupportedLanguage.SANTHALI,
    name: 'Santhali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: WritingScript.OL_CHIKI,
    unicodeRange: {
      start: 'U+1C50',
      end: 'U+1C7F',
    },
    hasSpeechSupport: true,
    hasTranslationSupport: true,
    direction: 'ltr',
    culturalNotes: 'Major tribal language spoken in Jharkhand, West Bengal, and Odisha.',
  },
  [SupportedLanguage.MUNDARI]: {
    id: SupportedLanguage.MUNDARI,
    name: 'Mundari',
    nativeName: 'ᱢᱩᱱᱰᱟᱹᱨᱤ',
    script: WritingScript.WARANG_CITI,
    unicodeRange: {
      start: 'U+118A0',
      end: 'U+118FF',
    },
    hasSpeechSupport: true,
    hasTranslationSupport: true,
    direction: 'ltr',
    culturalNotes: 'Austroasiatic language of the Munda people in the Chota Nagpur Plateau.',
  },
  [SupportedLanguage.HO]: {
    id: SupportedLanguage.HO,
    name: 'Ho',
    nativeName: '𑢹𑣉',
    script: WritingScript.WARANG_CITI,
    unicodeRange: {
      start: 'U+118A0',
      end: 'U+118FF',
    },
    hasSpeechSupport: true,
    hasTranslationSupport: true,
    direction: 'ltr',
    culturalNotes: 'Munda language of the Ho people, written in Warang Citi or Devanagari.',
  },
  [SupportedLanguage.HINDI]: {
    id: SupportedLanguage.HINDI,
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: WritingScript.DEVANAGARI,
    unicodeRange: {
      start: 'U+0900',
      end: 'U+097F',
    },
    hasSpeechSupport: true,
    hasTranslationSupport: true,
    direction: 'ltr',
  },
  [SupportedLanguage.ENGLISH]: {
    id: SupportedLanguage.ENGLISH,
    name: 'English',
    nativeName: 'English',
    script: WritingScript.LATIN,
    unicodeRange: {
      start: 'U+0000',
      end: 'U+007F',
    },
    hasSpeechSupport: true,
    hasTranslationSupport: true,
    direction: 'ltr',
  },
};
