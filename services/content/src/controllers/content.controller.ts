import { Request, Response } from 'express';
import { CurriculumService } from '../services/curriculum';
import { WorksheetGeneratorService } from '../services/worksheetGenerator';

export class ContentController {
  public static async getCourses(_req: Request, res: Response): Promise<void> {
    const courses = await CurriculumService.getCourses();
    res.json(courses);
  }

  public static async getCourseById(req: Request, res: Response): Promise<void> {
    const course = await CurriculumService.getCourseById(req.params.id as string);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  }

  public static async generateWorksheet(req: Request, res: Response): Promise<void> {
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
  }
}
