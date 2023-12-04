import { Router } from 'express';
import * as userController from '../controllers/userController';
import blockNonAdminUser from '../middlewares/blockNonAdminUser';

const usersRoutes = Router();

usersRoutes.post('/', blockNonAdminUser, userController.register);

export default usersRoutes;
