import { Router } from 'express';
import { AssessmentController } from '../controllers/assessment.controller';

const router = Router();

router.get('/:id', AssessmentController.getQuizById);
router.get('/lesson/:lessonId', AssessmentController.getQuizForLesson);
router.post('/:id/submit', AssessmentController.submitQuiz);

export default router;
