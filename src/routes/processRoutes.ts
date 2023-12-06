import { Router } from 'express';
import * as processController from '../controllers/processController';

const processRouter = Router();

processRouter.post('/', processController.createProcess);

processRouter.get('/', processController.getUserProcesses);

processRouter.get('/:id(\\d+)', processController.getProcessById);

processRouter
  .put('/process/:id(\\d+)/committee', processController.assignEvaluationCommittee);

export default processRouter;
