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
