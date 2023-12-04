import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as activityController from '../controllers/activityController';
import validateToken from '../middlewares/validateToken';
import processRouter from './processRoutes';
import activityRouter from './activityRoutes';
import usersRoutes from './users';

const router = Router();

// Auth
router.post('/login', authController.login);

router.post('/logout', validateToken, authController.logout);

router.use('/activities', validateToken, activityRouter);

router.use('/processes', validateToken, processRouter);

router.use('/users', validateToken, usersRoutes);

router.get('/activities/:fieldId/:number', activityController.getActivityByFieldNumber);

router.get('/activities', activityController.getAllActivity);

export default router;
