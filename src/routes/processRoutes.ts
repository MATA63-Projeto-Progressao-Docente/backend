import { Router } from 'express';
import { createProcess } from '../controllers/processController';
import validateToken from '../middlewares/validateToken';

const processRouter = Router();

processRouter.post('/', validateToken, createProcess);

export default processRouter;
