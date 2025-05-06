# Usar a collection postman para testar os endpoints. 
É só clonar o projeto, e importar o json dentro da pasta api-backend-pi3-postaman-collection para o postaman.
é necessário baixar o postman para testar os endpoints. 

antes de testar, pode dar o comando:

npx prisma migrate reset (para zerar o banco)
npx prisma generate

e entao rodar os testes do postman.

Resumo da Ordem de posts:
/users
/enderecos
/produtos
/estoque
/cupom
/pedidos
/pedidoProduto
/pagamentos
/avaliacao
/favoritos
/mensagem

Essa sequência garante que todas as dependências sejam atendidas para testar os endpoints corretamente.


Dá para testar direto no thunderclient também se os endpoints estiverem corretos. Fiz no postman porque o thunder não deixa fazer uma coleção grande de requests.

não é necessário usar o produtoValidator no list, pois a listagem geralmente não envolve validação de dados, mas coloquei para validar as listas com tratamento de erros.

Se quiser apagar o banco de dados, entrar no myworkbench, fazer um script zerado só com as informaçoes abaixo e rodar:


use `api-backend-pi3`;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Avaliacao;
TRUNCATE TABLE Favoritos;
TRUNCATE TABLE Mensagem;
TRUNCATE TABLE PedidoProduto;
TRUNCATE TABLE Pedido;
TRUNCATE TABLE Pagamento;
TRUNCATE TABLE Estoque;
TRUNCATE TABLE Produto;
TRUNCATE TABLE Endereco;
TRUNCATE TABLE Cupom;
TRUNCATE TABLE User;
SET FOREIGN_KEY_CHECKS = 1;

opcionalmente pode rodar 'npx prisma studio' e apagar manualmente no browser os dados. 