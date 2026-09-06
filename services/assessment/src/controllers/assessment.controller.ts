import { Request, Response } from 'express';
import { QuizService } from '../services/quiz.service';
import { SubmitQuizResponseSchema } from '@janbhasha/schemas';

export class AssessmentController {
  public static async getQuizById(req: Request, res: Response): Promise<void> {
    const quiz = await QuizService.getQuizById(req.params.id as string);
    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }
    res.json(quiz);
  }

  public static async getQuizForLesson(req: Request, res: Response): Promise<void> {
    const quiz = await QuizService.getQuizForLesson(req.params.lessonId as string);
    if (!quiz) {
      res.status(404).json({ error: 'No quiz for this lesson' });
      return;
    }
    res.json(quiz);
  }

  public static async submitQuiz(req: Request, res: Response): Promise<void> {
    try {
      const parsed = SubmitQuizResponseSchema.parse(req.body);
      const userId = (req.headers['x-user-id'] as string) || 'anonymous-learner';
      const result = await QuizService.gradeQuiz(
        req.params.id as string,
        userId,
        parsed.responses,
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
