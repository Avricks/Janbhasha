import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validation';
import { RegisterUserSchema, LoginUserSchema, RefreshTokenSchema } from '@janbhasha/schemas';

const router = Router();

router.post('/register', validateBody(RegisterUserSchema), AuthController.register);
router.post('/login', validateBody(LoginUserSchema), AuthController.login);
router.post('/refresh', validateBody(RefreshTokenSchema), AuthController.refresh);
router.post('/logout', AuthController.logout);

export default router;
