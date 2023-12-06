import { Router } from 'express';
import multer from 'multer';
import * as processController from '../controllers/processController';

const processRouter = Router();

const storage = multer({
  dest: 'uploads/',
});

processRouter.post(
  '/',
  storage.fields([{ name: 'documentsFiles' }]),
  processController.createProcess,
);

export default processRouter;
