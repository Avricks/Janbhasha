import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';

const router = Router();

router.get('/courses', ContentController.getCourses);
router.get('/courses/:id', ContentController.getCourseById);
router.post('/worksheets/generate', ContentController.generateWorksheet);

export default router;
