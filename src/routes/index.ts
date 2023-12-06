import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as fieldController from '../controllers/fieldController';
import * as classesController from '../controllers/classesController';
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

router.get('/fields', validateToken, fieldController.getAllFields);

router.get('/fields/:fieldId', validateToken, fieldController.getField);

router.get('/classes', classesController.getAll);

export default router;
