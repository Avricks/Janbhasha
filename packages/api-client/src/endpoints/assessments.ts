import { ApiClient } from '../client';
import { Quiz, QuizResult } from '@janbhasha/domain';

export class AssessmentsEndpoint {
  constructor(private client: ApiClient) {}

  public async getQuizById(id: string): Promise<Quiz> {
    return this.client.get<Quiz>(`/api/v1/assessments/${id}`);
  }

  public async getQuizForLesson(lessonId: string): Promise<Quiz> {
    return this.client.get<Quiz>(`/api/v1/assessments/lesson/${lessonId}`);
  }

  public async submitQuiz(
    quizId: string,
    responses: { questionId: string; selectedChoiceId?: string; textResponse?: string; timeSpentSeconds: number }[],
  ): Promise<QuizResult> {
    return this.client.post<QuizResult>(`/api/v1/assessments/${quizId}/submit`, {
      quizId,
      responses,
    });
  }

  public async getQuizResults(quizId: string): Promise<QuizResult[]> {
    return this.client.get<QuizResult[]>(`/api/v1/assessments/${quizId}/results`);
  }
}
