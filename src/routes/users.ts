import { Router } from 'express';
import * as userController from '../controllers/userController';

const usersRoutes = Router();

usersRoutes.post('/', userController.register);
usersRoutes.get('/', userController.getAll);
usersRoutes.get('/:userId', userController.getOne);

export default usersRoutes;
