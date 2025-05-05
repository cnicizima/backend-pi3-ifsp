import helmet from "helmet";

const hstsMiddleware = helmet.hsts({
  maxAge: 31536000, // Define o período de validade do HSTS em segundos (1 ano)
  includeSubDomains: true, // Aplica HSTS a todos os subdomínios
  preload: true, // Solicita o site para ser incluído na lista de pré-carregamento HSTS dos navegadores
});

export default hstsMiddleware;