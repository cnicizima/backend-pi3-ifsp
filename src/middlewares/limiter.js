import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 requisições por IP no intervalo de 15 minutos
  message: 'Too many requests, please try again later.', // Mensagem caso o limite seja atingido
  standardHeaders: true, // Inclui informações de limite nos cabeçalhos padrão
  legacyHeaders: false, // Desativa os cabeçalhos legados
});

export default limiter;