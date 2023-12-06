import { Router } from 'express';
import * as processController from '../controllers/processController';

const processRouter = Router();

processRouter.post(
  '/',
  processController.createProcess,
);

export default processRouter;
