import { SupportedLanguage } from '@janbhasha/domain';

export interface TranscriptionResponse {
  text: string;
  nativeScript: string;
  confidence: number;
  language: SupportedLanguage;
  durationSeconds: number;
}

export class TranscriptionService {
  public static async transcribe(
    _audioBase64: string,
    language: SupportedLanguage,
  ): Promise<TranscriptionResponse> {
    // Simulates ASR pipeline (Wav2Vec2 / Whisper fine-tuned for regional phonetics)
    const samples: Record<SupportedLanguage, { text: string; nativeScript: string }> = {
      [SupportedLanguage.SANTHALI]: {
        text: 'Johar, Inag nutum do Soren kana.',
        nativeScript: 'ᱡᱚᱦᱟᱨ, ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱥᱚᱨᱮᱱ ᱠᱟᱱᱟ᱾',
      },
      [SupportedLanguage.MUNDARI]: {
        text: 'Johar, am chilka menama?',
        nativeScript: 'ᱡᱚᱦᱟᱨ, ᱟᱢ ᱪᱤᱞᱠᱟ ᱢᱮᱱᱟᱢᱟ?',
      },
      [SupportedLanguage.HO]: {
        text: 'Johar, am okoe?',
        nativeScript: '𑢹𑣉 ᱡᱚᱦᱟᱨ',
      },
      [SupportedLanguage.HINDI]: {
        text: 'Namaste, aap kaise hain?',
        nativeScript: 'नमस्ते, आप कैसे हैं?',
      },
      [SupportedLanguage.ENGLISH]: {
        text: 'Hello, welcome to Janbhasha.',
        nativeScript: 'Hello, welcome to Janbhasha.',
      },
    };

    const result = samples[language] || samples[SupportedLanguage.SANTHALI];
    return {
      text: result.text,
      nativeScript: result.nativeScript,
      confidence: 0.94,
      language,
      durationSeconds: 3.2,
    };
  }
}
