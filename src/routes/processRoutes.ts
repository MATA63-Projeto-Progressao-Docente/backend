import { Router } from 'express';
import { createProcess } from '../controllers/processController';
import blockNonAdminUser from '../middlewares/blockNonAdminUser';

const processRouter = Router();

processRouter.post('/', blockNonAdminUser, createProcess);

export default processRouter;
