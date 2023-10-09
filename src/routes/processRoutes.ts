import { Router } from 'express';
import { createProcess } from '../controllers/processController';

const processRouter = Router();

processRouter.post('/create', createProcess);

export default processRouter;
