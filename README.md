# backend-pi3-ifsp

API RESTful para um e-commerce de vinhos, desenvolvida como projeto acadêmico no IFSP. Utiliza Node.js, Express, Prisma ORM, SQLite, autenticação JWT, validação com Zod e geração de dados mock com Faker.

---

## Sumário

- [Tecnologias](#tecnologias)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Scripts úteis](#scripts-úteis)
- [Estrutura das pastas](#estrutura-das-pastas)
- [Principais funcionalidades](#principais-funcionalidades)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Reset do banco de dados](#reset-do-banco-de-dados)
- [Coleção Postman](#coleção-postman)
- [Observações](#observações)

---

## Tecnologias

- Node.js
- Express
- Prisma ORM
- SQLite (padrão, mas pode ser adaptado para outros bancos)
- Zod (validação)
- JWT (autenticação)
- Faker (mock de dados)
- Bcrypt (hash de senha)
- Helmet, CORS, Rate Limit (segurança)
- HTTPS (certificado autoassinado para dev)

---

## Como rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone <url-do-repo>
   cd backend-pi3-ifsp
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`**
   - Exemplo já incluso no projeto:
     ```
     DATABASE_URL="file:./dev.db"
     JWT_SECRET="sua_senha_secreta"
     ```

4. **Rode as migrations do Prisma**
   ```bash
   npx prisma migrate deploy
   ```

5. **(Opcional) Gere dados mock**
   ```bash
   node faker_mockData.js
   ```

6. **Inicie o servidor**
   ```bash
   npm run dev
   ```
   O servidor rodará por padrão em HTTPS na porta 3000.

---

## Scripts úteis

- `npm run dev` — Inicia o servidor em modo desenvolvimento com reload automático.
- `node zerar_banco_hard_reset.js` — Zera todas as tabelas do banco e reseta os IDs (hard reset).
- `node faker_mockData.js` — Popula o banco com dados mockados realistas.

---

## Estrutura das pastas

```
src/
  controllers/      # Lógica das rotas (CRUD, autenticação, etc)
  models/           # Prisma ORM + validações Zod
  routers/          # Rotas Express
  middlewares/      # Middlewares de autenticação, erros, etc
  certificate-ssl/  # Certificado autoassinado para HTTPS local
prisma/
  schema.prisma     # Schema do banco de dados
  dev.db            # Banco SQLite local
faker_mockData.js   # Script para popular o banco
zerar_banco_hard_reset.js # Script para zerar o banco
.env                # Variáveis de ambiente
```

---

## Principais funcionalidades

- **Usuários**: cadastro, login, atualização, remoção, autenticação JWT, hash de senha.
- **Produtos**: CRUD completo, estoque, classificação, descrição, vínculos com avaliações e favoritos.
- **Pedidos e Pagamentos**: criação de pedidos, itens, pagamentos, cupons.
- **Endereços**: CRUD, filtro por usuário.
- **Avaliações**: CRUD, filtro por usuário e produto.
- **Mensagens**: CRUD, mensagens de usuários para o sistema.
- **Favoritos**: adicionar/remover produtos favoritos.
- **Segurança**: HTTPS, Helmet, Rate Limit, CORS, autenticação JWT.
- **Validação**: Todos os endpoints validam dados com Zod.

---

## Variáveis de ambiente

Veja o arquivo [.env](.env):

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_senha_secreta"
```

---

## Reset do banco de dados

Para zerar todas as tabelas e IDs (hard reset):

```bash
node zerar_banco_hard_reset.js
```

---

## Coleção Postman

Acesse a pasta [`api-backend-pi3-postman-collection`](api-backend-pi3-postman-collection/) para exemplos de requisições e testes de endpoints.

---

## Observações

- O projeto está configurado para uso acadêmico e desenvolvimento local.
- O arquivo `.env` **não deve ser versionado em produção**.
- O certificado SSL é autoassinado e serve apenas para testes locais.
- O banco padrão é SQLite, mas pode ser adaptado para outros bancos suportados pelo Prisma.

---

## Licença

Projeto acadêmico — IFSP.