import express from 'express';
import userRouter from './routers/userRouter.js';
import produtoRouter from './routers/produtoRouter.js';
import enderecoRouter from './routers/enderecoRouter.js';
import estoqueRouter from './routers/estoqueRouter.js';
import cors from 'cors';


const app = express();


app.use(cors());
app.use(express.json());


app.get('/', ( req , res ) => {
  return res.json({
    message: "Bem vindo à API"
  })
});


// paths dos roteadores:
app.use('/users', userRouter);
app.use('/produtos', produtoRouter);
app.use('/enderecos', enderecoRouter);
app.use('/estoque', estoqueRouter);

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});