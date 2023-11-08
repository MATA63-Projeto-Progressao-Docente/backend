import { Router } from 'express';
import blockNonAdminUser from '../middlewares/blockNonAdminUser';
import * as activityController from '../controllers/activityController';

const activityRouter = Router();

activityRouter.post('/', blockNonAdminUser, activityController.createActivity);

export default activityRouter;
