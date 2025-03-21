import express from 'express';
import userRouter from './routers/userRouter.js';
import cors from 'cors';


const app = express();

app.use('/users', userRouter);
app.use(cors());
app.use(express.json());


app.get('/', ( req , res ) => {
  return res.json({
    message: "Bem vindo à API"
  })
});




// paths dos roteadores:
app.use('/users', userRouter);



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});