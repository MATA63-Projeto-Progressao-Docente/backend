import { Router } from 'express';
import blockNonAdminUser from '../middlewares/blockNonAdminUser';

const activityRouter = Router();

activityRouter.post('/', blockNonAdminUser);

export default activityRouter;
