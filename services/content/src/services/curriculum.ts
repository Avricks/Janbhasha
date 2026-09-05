import { Course, DifficultyLevel } from '@janbhasha/domain';

const defaultCourses: Course[] = [
  {
    id: 'crs_sat_01',
    title: 'Foundational Santhali (Ol Chiki)',
    nativeTitle: 'ᱢᱩᱲᱩᱫ ᱥᱟᱱᱛᱟᱲᱤ ᱥᱮᱪᱮᱫ',
    targetLanguageId: 'sat',
    instructionLanguageId: 'eng',
    description: 'Master Ol Chiki script reading, writing, and basic conversational fluency in Santhali.',
    difficulty: DifficultyLevel.BEGINNER,
    thumbnailUrl: 'https://assets.janbhasha.org/courses/sat_thumb.png',
    tags: ['santhali', 'ol_chiki', 'beginner', 'tribal'],
    isPublished: true,
    version: 1,
    modules: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'crs_unr_01',
    title: 'Everyday Mundari Language',
    nativeTitle: 'ᱡᱤᱭᱚᱱ ᱢᱩᱱᱰᱟᱹᱨᱤ',
    targetLanguageId: 'unr',
    instructionLanguageId: 'hin',
    description: 'Learn vocabulary and expressions for daily communication in Mundari.',
    difficulty: DifficultyLevel.ELEMENTARY,
    thumbnailUrl: 'https://assets.janbhasha.org/courses/unr_thumb.png',
    tags: ['mundari', 'chota_nagpur', 'conversation'],
    isPublished: true,
    version: 1,
    modules: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'crs_hoc_01',
    title: 'Introduction to Ho Language & Culture',
    nativeTitle: '𑢹𑣉 ᱡᱟᱜᱟᱨ ᱟᱨ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ',
    targetLanguageId: 'hoc',
    instructionLanguageId: 'eng',
    description: 'Explore the grammar, vocabulary, and folklore of the Ho community.',
    difficulty: DifficultyLevel.BEGINNER,
    thumbnailUrl: 'https://assets.janbhasha.org/courses/hoc_thumb.png',
    tags: ['ho', 'warang_citi', 'culture'],
    isPublished: true,
    version: 1,
    modules: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class CurriculumService {
  public static async getCourses(): Promise<Course[]> {
    return defaultCourses;
  }

  public static async getCourseById(id: string): Promise<Course | null> {
    return defaultCourses.find((c) => c.id === id) || null;
  }
}
