import { Router } from 'express';
import * as authController from '../controllers/authController';
import validateToken from '../middlewares/validateToken';

const router = Router();

// Auth
router.post('/login', authController.login);

router.post('/logout', validateToken, authController.logout);

export default router;
