import { Router, Request, Response } from 'express';
import { QuizService } from '../services/quiz.service';
import { SubmitQuizResponseSchema } from '@janbhasha/schemas';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  const quiz = await QuizService.getQuizById(req.params.id as string);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  res.json(quiz);
});

router.get('/lesson/:lessonId', async (req: Request, res: Response) => {
  const quiz = await QuizService.getQuizForLesson(req.params.lessonId as string);
  if (!quiz) return res.status(404).json({ error: 'No quiz for this lesson' });
  res.json(quiz);
});

router.post('/:id/submit', async (req: Request, res: Response) => {
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
});

export default router;
