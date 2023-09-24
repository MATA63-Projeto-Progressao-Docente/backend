import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import handleError from './middlewares/handleError';
import router from './routes';

const app = express();

app.use(express.json({}));
app.use(cors());
app.use(cookieParser());

app.use(router);

app.use(handleError);

app.listen(4000, () => console.log(`🚀 Server ready at: http://localhost:3000`));
