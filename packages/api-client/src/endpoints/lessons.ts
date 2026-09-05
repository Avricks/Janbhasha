import { ApiClient } from '../client';
import { Lesson, LearningRecord } from '@janbhasha/domain';

export class LessonsEndpoint {
  constructor(private client: ApiClient) {}

  public async getLessons(params?: { languageId?: string; difficulty?: string }): Promise<Lesson[]> {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const endpoint = `/api/v1/lessons${query ? `?${query}` : ''}`;
    return this.client.get<Lesson[]>(endpoint);
  }

  public async getLessonById(id: string): Promise<Lesson> {
    return this.client.get<Lesson>(`/api/v1/lessons/${id}`);
  }

  public async updateProgress(
    lessonId: string,
    data: { progressPercent: number; timeSpentSeconds: number; isCompleted: boolean },
  ): Promise<LearningRecord> {
    return this.client.post<LearningRecord>(`/api/v1/lessons/${lessonId}/progress`, data);
  }

  public async getUserProgress(): Promise<LearningRecord[]> {
    return this.client.get<LearningRecord[]>('/api/v1/progress/me');
  }
}
