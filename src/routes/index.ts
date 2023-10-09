import { Router } from 'express';
import * as authController from '../controllers/authController';
import validateToken from '../middlewares/validateToken';
import processRouter from './processRoutes';

const router = Router();

// Auth
router.post('/login', authController.login);

router.post('/logout', validateToken, authController.logout);

router.use('/processes', validateToken, processRouter);

export default router;
