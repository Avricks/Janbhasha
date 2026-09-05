import { Request, Response, NextFunction } from 'express';
import { LessonService } from '../services/lesson.service';

export class LessonsController {
  public static async getLessons(req: Request, res: Response, next: NextFunction) {
    try {
      const { languageId, difficulty } = req.query;
      const lessons = await LessonService.getLessons({
        languageId: languageId as string,
        difficulty: difficulty as string,
      });
      res.json(lessons);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async getLessonById(req: Request, res: Response, next: NextFunction) {
    try {
      const lesson = await LessonService.getLessonById(req.params.id as string);
      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      res.json(lesson);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async createLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const lesson = await LessonService.createLesson(req.body);
      res.status(201).json(lesson);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
