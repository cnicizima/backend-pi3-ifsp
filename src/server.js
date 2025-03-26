import express from 'express';
import enderecoRouter from './routers/enderecoRouter.js';
import estoqueRouter from './routers/estoqueRouter.js';
import pedidoRouter from './routers/pedidoRouter.js';
import produtoRouter from './routers/produtoRouter.js';
import userRouter from './routers/userRouter.js';
import pagamentoRouter from './routers/pagamentoRouter.js';
import pedidoProdutoRouter from './routers/pedidoProdutoRouter.js';
import favoritoRouter from './routers/favoritoRouter.js';
import avaliacaoRouter from './routers/avaliacaoRouter.js'
import mensagemRouter from './routers/mensagemRouter.js';
import cupomRouter from './routers/cupomRouter.js'


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
app.use('/pedidos', pedidoRouter);
app.use('/pagamentos', pagamentoRouter);
app.use('/pedidoProduto', pedidoProdutoRouter);
app.use('/favoritos', favoritoRouter);
app.use('/avaliacao', avaliacaoRouter);
app.use('/mensagem', mensagemRouter)
app.use('/cupom', cupomRouter)

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});