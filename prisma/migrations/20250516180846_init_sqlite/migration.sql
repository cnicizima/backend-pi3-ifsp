-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sexo" TEXT,
    "telefone" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "client" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endereco" (
    "idEndereco" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioCpf" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    CONSTRAINT "Endereco_usuarioCpf_fkey" FOREIGN KEY ("usuarioCpf") REFERENCES "User" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido" (
    "idPedido" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioCpf" TEXT NOT NULL,
    "idEndereco" INTEGER NOT NULL,
    "valorTotal" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "dataCompra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idCupom" INTEGER,
    CONSTRAINT "Pedido_usuarioCpf_fkey" FOREIGN KEY ("usuarioCpf") REFERENCES "User" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_idEndereco_fkey" FOREIGN KEY ("idEndereco") REFERENCES "Endereco" ("idEndereco") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_idCupom_fkey" FOREIGN KEY ("idCupom") REFERENCES "Cupom" ("idCupom") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "idPagamento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idPedido" INTEGER NOT NULL,
    "metodo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "valorPago" REAL NOT NULL,
    "dataPagamento" DATETIME,
    CONSTRAINT "Pagamento_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "Pedido" ("idPedido") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produto" (
    "idProduto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fotoVinho" TEXT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" REAL NOT NULL,
    "classificacao" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "gustativo" TEXT,
    "olfativo" TEXT,
    "regiao" TEXT,
    "amadurecimento" TEXT,
    "analises" TEXT,
    "uvas" TEXT,
    "temperatura" TEXT
);

-- CreateTable
CREATE TABLE "Estoque" (
    "idEstoque" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idProduto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Estoque_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PedidoProduto" (
    "idPedidoProduto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idPedido" INTEGER NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorItem" REAL NOT NULL,
    CONSTRAINT "PedidoProduto_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "Pedido" ("idPedido") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PedidoProduto_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favoritos" (
    "idFavorito" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioCpf" TEXT NOT NULL,
    "idProduto" INTEGER NOT NULL,
    CONSTRAINT "Favoritos_usuarioCpf_fkey" FOREIGN KEY ("usuarioCpf") REFERENCES "User" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favoritos_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "idAvaliacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioCpf" TEXT NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "avaliacao" REAL NOT NULL,
    "conteudo" TEXT,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Avaliacao_usuarioCpf_fkey" FOREIGN KEY ("usuarioCpf") REFERENCES "User" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mensagem" (
    "idMensagem" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioCpf" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataEnvio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Mensagem_usuarioCpf_fkey" FOREIGN KEY ("usuarioCpf") REFERENCES "User" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cupom" (
    "idCupom" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "desconto" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_idPedido_key" ON "Pagamento"("idPedido");

-- CreateIndex
CREATE UNIQUE INDEX "Estoque_idProduto_key" ON "Estoque"("idProduto");

-- CreateIndex
CREATE UNIQUE INDEX "Cupom_codigo_key" ON "Cupom"("codigo");
