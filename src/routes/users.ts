import { Router } from 'express';
import * as userController from '../controllers/userController';

const usersRoutes = Router();

usersRoutes.post('/', userController.register);

export default usersRoutes;
