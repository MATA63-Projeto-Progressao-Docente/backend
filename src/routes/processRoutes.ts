import { Router } from 'express';
import { createProcess } from '../controllers/processController';

const processRouter = Router();

processRouter.post('/', createProcess);

export default processRouter;
