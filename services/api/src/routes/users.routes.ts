import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { authenticateJwt } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { UserPreferencesSchema } from '@janbhasha/schemas';

const router = Router();

router.get('/me', authenticateJwt, UsersController.getMe);
router.patch('/me/preferences', authenticateJwt, validateBody(UserPreferencesSchema.partial()), UsersController.updatePreferences);

export default router;
