import { Lesson, DifficultyLevel } from '@janbhasha/domain';

// Default mock lessons in Santhali, Mundari, Ho
const defaultLessons: Lesson[] = [
  {
    id: 'les_sat_01',
    moduleId: 'mod_01',
    courseId: 'crs_sat_01',
    title: 'Lesson 1: Ol Chiki Alphabet Basics',
    nativeTitle: 'ᱞᱮᱥᱚᱱ ᱑: ᱚᱞ ᱪᱤᱠᱤ ᱢᱩᱲᱩᱫ',
    languageId: 'sat',
    description: 'Learn the primary characters of the Ol Chiki script for Santhali.',
    difficulty: DifficultyLevel.BEGINNER,
    estimatedMinutes: 15,
    order: 1,
    sections: [
      {
        id: 'sec_01',
        title: 'Introduction to Vowels',
        content: 'Ol Chiki has 6 basic vowels: LA, AT, AG, ANG, AL, LAA...',
        nativeScriptContent: 'ᱞᱟ, ᱟᱛ, ᱟᱜ, ᱟᱝ, ᱟᱞ...',
        order: 1,
        assets: [],
      },
    ],
    assets: [],
    isPublished: true,
    version: 1,
    createdBy: 'system',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'les_unr_01',
    moduleId: 'mod_02',
    courseId: 'crs_unr_01',
    title: 'Lesson 1: Common Greetings in Mundari',
    nativeTitle: 'ᱡᱚᱦᱟᱨ ᱢᱩᱱᱰᱟᱹᱨᱤ',
    languageId: 'unr',
    description: 'Learn basic conversational greetings in Mundari.',
    difficulty: DifficultyLevel.BEGINNER,
    estimatedMinutes: 10,
    order: 1,
    sections: [
      {
        id: 'sec_02',
        title: 'Daily Greetings',
        content: 'Johar is the traditional greeting used in Mundari society.',
        nativeScriptContent: 'ᱡᱚᱦᱟᱨ',
        transliteration: 'Johar',
        order: 1,
        assets: [],
      },
    ],
    assets: [],
    isPublished: true,
    version: 1,
    createdBy: 'system',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'les_hoc_01',
    moduleId: 'mod_03',
    courseId: 'crs_hoc_01',
    title: 'Lesson 1: Ho Numbers and Counting',
    nativeTitle: '𑢹𑣉 ᱞᱮᱠᱷᱟ',
    languageId: 'hoc',
    description: 'Learn numbers 1 to 10 in Ho language with Warang Citi script.',
    difficulty: DifficultyLevel.BEGINNER,
    estimatedMinutes: 12,
    order: 1,
    sections: [
      {
        id: 'sec_03',
        title: 'Numbers 1 to 5',
        content: 'Miyad (1), Baria (2), Apea (3), Upunia (4), Mōyā (5)',
        nativeScriptContent: '𑣡, 𑣢, 𑣣, 𑣤, 𑣥',
        transliteration: 'Miyad, Baria, Apea, Upunia, Moya',
        order: 1,
        assets: [],
      },
    ],
    assets: [],
    isPublished: true,
    version: 1,
    createdBy: 'system',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class LessonService {
  public static async getLessons(filter?: { languageId?: string; difficulty?: string }): Promise<Lesson[]> {
    let result = [...defaultLessons];
    if (filter?.languageId) {
      result = result.filter((l) => l.languageId === filter.languageId);
    }
    if (filter?.difficulty) {
      result = result.filter((l) => l.difficulty === filter.difficulty);
    }
    return result;
  }

  public static async getLessonById(id: string): Promise<Lesson | null> {
    const lesson = defaultLessons.find((l) => l.id === id);
    return lesson || null;
  }

  public static async createLesson(data: any): Promise<Lesson> {
    const newLesson: Lesson = {
      ...data,
      id: `les_${Date.now()}`,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    defaultLessons.push(newLesson);
    return newLesson;
  }
}
