import express from 'express'
import authRouter from './routes/auth'

const app = express()

app.use(express.json({}))

app.use(authRouter);

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
