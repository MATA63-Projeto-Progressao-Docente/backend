import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import router from './routes';
import handleError from './middlewares/handleError';

const app = express();

app.use(express.json({}));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://frontend-pied-eight.vercel.app/',
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));
app.use(cookieParser());

app.use('/', router);

router.use(handleError);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at: http://${process.env.SERVER_URL}:${PORT}`);
});
