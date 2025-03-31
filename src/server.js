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
import rateLimit from 'express-rate-limit'; 
import fs from 'fs'; 
import https from 'https';
import helmet from 'helmet';


const app = express();



// Configuração de Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 requisições por IP no intervalo de 15 minutos
  message: 'Too many requests, please try again later.', // Mensagem caso o limite seja atingido
  standardHeaders: true,
  legacyHeaders: false,
});



app.use(limiter); // Aplicar rate limiting globalmente para todas as rotas
app.use(cors());
app.use(express.json());


// Usando Helmet para segurança adicional, incluindo HSTS
app.use(helmet());

// Configuração de HSTS (HTTP Strict Transport Security)
app.use(helmet.hsts({
  maxAge: 31536000, // Define o período de validade do HSTS em segundos (1 ano)
  includeSubDomains: true, // Aplica HSTS a todos os subdomínios
  preload: true, // Solicita o site para ser incluído na lista de pré-carregamento HSTS dos navegadores
}));

// Certificados SSL (criado apenas para desenvolvimento local com o generate-cert.js, para produçao, precisa obter SSL pago)
const sslOptions = {
  key: fs.readFileSync('./src/certificate-ssl/key.pem'),   // Caminho para a chave privada
  cert: fs.readFileSync('./src/certificate-ssl/cert.pem'), // Caminho para o certificado
};


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



// Configuração do servidor HTTPS
https.createServer(sslOptions, app).listen(8000, () => {
  console.log('Servidor HTTPS rodando em https://localhost:8000');
});