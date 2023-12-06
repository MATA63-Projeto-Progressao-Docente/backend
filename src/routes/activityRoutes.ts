import { Router } from 'express';
import blockNonAdminUser from '../middlewares/blockNonAdminUser';
import * as activityController from '../controllers/activityController';

const activityRouter = Router();

activityRouter.post('/', blockNonAdminUser, activityController.createActivity);
activityRouter.get('/:fieldId/:number', activityController.getActivityByFieldNumber);
activityRouter.get('/', activityController.getAllActivity);

export default activityRouter;
