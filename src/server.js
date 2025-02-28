import express from 'express';
import userRouter from './routers/userRouter.js';

const app = express();

app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});