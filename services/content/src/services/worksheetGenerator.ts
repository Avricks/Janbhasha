export interface WorksheetItem {
  questionNumber: number;
  type: 'matching' | 'fill_in_the_blank' | 'translation' | 'multiple_choice';
  prompt: string;
  nativePrompt?: string;
  options?: string[];
  expectedAnswer: string;
}

export interface GeneratedWorksheet {
  id: string;
  title: string;
  languageId: string;
  difficulty: string;
  items: WorksheetItem[];
  generatedAt: Date;
}

export class WorksheetGeneratorService {
  public static async generate(
    topic: string,
    languageId: string,
    difficulty = 'A1',
    itemCount = 5,
  ): Promise<GeneratedWorksheet> {
    const items: WorksheetItem[] = [];

    for (let i = 1; i <= itemCount; i++) {
      items.push({
        questionNumber: i,
        type: i % 2 === 0 ? 'translation' : 'multiple_choice',
        prompt: `Translate the term for exercise #${i} (${topic})`,
        nativePrompt: languageId === 'sat' ? `ᱞᱮᱥᱚᱱ ᱟᱹᱲᱟᱹ #${i}` : undefined,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        expectedAnswer: 'Option A',
      });
    }

    return {
      id: `ws_${Date.now()}`,
      title: `${topic} - Practice Worksheet (${difficulty})`,
      languageId,
      difficulty,
      items,
      generatedAt: new Date(),
    };
  }
}
