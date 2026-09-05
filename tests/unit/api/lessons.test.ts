import { describe, it, expect } from 'vitest';
import { LessonService } from '../../../services/api/src/services/lesson.service';

describe('LessonService Unit Tests', () => {
  it('should retrieve list of default lessons for Santhali', async () => {
    const lessons = await LessonService.getLessons({ languageId: 'sat' });
    expect(lessons.length).toBeGreaterThan(0);
    expect(lessons[0]?.languageId).toBe('sat');
    expect(lessons[0]?.title).toContain('Ol Chiki');
  });

  it('should find lesson by ID', async () => {
    const lesson = await LessonService.getLessonById('les_sat_01');
    expect(lesson).not.toBeNull();
    expect(lesson?.id).toBe('les_sat_01');
  });
});
