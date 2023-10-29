import { Router } from 'express';
import * as authController from '../controllers/authController';
import validateToken from '../middlewares/validateToken';
import usersRoutes from './users';

const router = Router();

// Auth
router.post('/login', authController.login);

router.post('/logout', validateToken, authController.logout);

router.use('/users', validateToken, usersRoutes);

export default router;
