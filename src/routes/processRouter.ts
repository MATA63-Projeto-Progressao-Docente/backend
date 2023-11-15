import { Router } from 'express';
import * as processController from '../controllers/processController';

const processRouter = Router();

processRouter
  .put('/process/:id(\\d+)/committee', processController.assignEvaluationCommittee);

export default processRouter;
