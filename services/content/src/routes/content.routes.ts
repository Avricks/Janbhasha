import { Router, Request, Response } from 'express';
import { CurriculumService } from '../services/curriculum';
import { WorksheetGeneratorService } from '../services/worksheetGenerator';

const router = Router();

router.get('/courses', async (_req: Request, res: Response) => {
  const courses = await CurriculumService.getCourses();
  res.json(courses);
});

router.get('/courses/:id', async (req: Request, res: Response) => {
  const course = await CurriculumService.getCourseById(req.params.id as string);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

router.post('/worksheets/generate', async (req: Request, res: Response) => {
  try {
    const { topic, languageId, difficulty, itemCount } = req.body;
    const worksheet = await WorksheetGeneratorService.generate(
      topic || 'General Vocabulary',
      languageId || 'sat',
      difficulty || 'A1',
      itemCount || 5,
    );
    res.json(worksheet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
