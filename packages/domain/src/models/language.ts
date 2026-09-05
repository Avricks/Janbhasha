/**
 * Regional Language, Script, Vocabulary, and Grammar Models
 */

export enum SupportedLanguage {
  SANTHALI = 'sat',
  MUNDARI = 'unr',
  HO = 'hoc',
  HINDI = 'hin',
  ENGLISH = 'eng',
}

export enum WritingScript {
  OL_CHIKI = 'ol_chiki', // Santhali
  WARANG_CITI = 'warang_citi', // Mundari / Ho
  DEVANAGARI = 'devanagari', // Ho / Hindi
  LATIN = 'latin', // Romanized phonetic
}

export interface LanguageMetadata {
  id: SupportedLanguage;
  name: string;
  nativeName: string;
  script: WritingScript;
  unicodeRange: {
    start: string;
    end: string;
  };
  hasSpeechSupport: boolean;
  hasTranslationSupport: boolean;
  direction: 'ltr' | 'rtl';
  culturalNotes?: string;
}

export interface VocabularyConcept {
  id: string;
  languageId: SupportedLanguage;
  nativeScript: string;
  romanized: string;
  ipaPhonetic?: string;
  meaningsInEnglish: string[];
  meaningsInHindi: string[];
  partOfSpeech: string;
  exampleSentences: {
    nativeScript: string;
    romanized: string;
    english: string;
    hindi: string;
    audioUrl?: string;
  }[];
  audioPronunciationUrl?: string;
  category: string;
  tags: string[];
}

export interface GrammarRule {
  id: string;
  languageId: SupportedLanguage;
  name: string;
  description: string;
  pattern: string;
  examples: {
    input: string;
    explanation: string;
    translation: string;
  }[];
}
