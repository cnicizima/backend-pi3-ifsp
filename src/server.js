import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import helmet from 'helmet';
import { errorsHandler } from './middlewares/errorsHandler.js';
import { logger } from './middlewares/logger.js'; // Middleware de log
import limiter  from './middlewares/limiter.js';
import hstsMiddleware  from './middlewares/hstsMiddleware.js'; // Middleware de HSTS
import notFoundController from '../src/notFoundController.js'; // Controller para rotas não encontradas

// Importação dos roteadores
import enderecoRouter from './routers/enderecoRouter.js';
import estoqueRouter from './routers/estoqueRouter.js';
import pedidoRouter from './routers/pedidoRouter.js';
import produtoRouter from './routers/produtoRouter.js';
import userRouter from './routers/userRouter.js';
import pagamentoRouter from './routers/pagamentoRouter.js';
import pedidoProdutoRouter from './routers/pedidoProdutoRouter.js';
import favoritoRouter from './routers/favoritoRouter.js';
import avaliacaoRouter from './routers/avaliacaoRouter.js';
import mensagemRouter from './routers/mensagemRouter.js';
import cupomRouter from './routers/cupomRouter.js';
import authRouter from './routers/authRouter.js';

const app = express();

app.use(logger); // Middleware de log para todas as requisições

// Middlewares globais de segurança e configuração
app.use(helmet()); // Segurança adicional
app.use(cors()); // Permitir requisições de diferentes origens


app.use(limiter); // Aplicar rate limiting globalmente para todas as rotas

// Middlewares de parsing
app.use(express.json()); // Parsing de JSON
app.use(express.urlencoded({ extended: true })); // Parsing de URL-encoded - caso receba dados urlcoded

// Configuração de HSTS (HTTP Strict Transport Security)
app.use(hstsMiddleware); // HSTS para segurança adicional

// Rota inicial
app.get('/', (req, res) => {
  return res.json({
    message: 'Bem vindo à API',
  });
});

// Paths dos roteadores
app.use('/users', userRouter);
app.use('/produtos', produtoRouter);
app.use('/enderecos', enderecoRouter);
app.use('/estoque', estoqueRouter);
app.use('/pedidos', pedidoRouter);
app.use('/pagamentos', pagamentoRouter);
app.use('/pedidoProduto', pedidoProdutoRouter);
app.use('/favoritos', favoritoRouter);
app.use('/avaliacao', avaliacaoRouter);
app.use('/mensagem', mensagemRouter);
app.use('/cupom', cupomRouter);
app.use('/auth', authRouter);

app.use('*', notFoundController)// //middleware para tratar rotas não encontradas. O '*' significa que ele vai pegar todas as rotas que não foram tratadas antes.

app.use(errorsHandler); // Middleware de tratamento de erros


// Certificados SSL (criado apenas para desenvolvimento local com o generate-cert.js, para produção, precisa obter SSL pago)
const sslOptions = {
  key: fs.readFileSync('./src/certificate-ssl/key.pem'), // Caminho para a chave privada
  cert: fs.readFileSync('./src/certificate-ssl/cert.pem'), // Caminho para o certificado
};

// Configuração do servidor HTTPS
https.createServer(sslOptions, app).listen(8000, () => {
  console.log('Servidor HTTPS rodando em https://localhost:8000');
});