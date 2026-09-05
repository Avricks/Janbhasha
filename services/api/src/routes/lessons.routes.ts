import { Router } from 'express';
import { LessonsController } from '../controllers/lessons.controller';
import { authenticateJwt, requireRole } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { CreateLessonSchema } from '@janbhasha/schemas';
import { UserRole } from '@janbhasha/domain';

const router = Router();

router.get('/', LessonsController.getLessons);
router.get('/:id', LessonsController.getLessonById);
router.post(
  '/',
  authenticateJwt,
  requireRole(UserRole.EDUCATOR, UserRole.ADMINISTRATOR),
  validateBody(CreateLessonSchema),
  LessonsController.createLesson,
);

export default router;
