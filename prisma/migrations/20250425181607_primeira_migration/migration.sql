-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` CHAR(11) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `sexo` VARCHAR(30) NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `nascimento` DATE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `avatar` TEXT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `idEndereco` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioCpf` CHAR(11) NOT NULL,
    `apelido` VARCHAR(100) NOT NULL,
    `cep` CHAR(8) NOT NULL,
    `rua` VARCHAR(255) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `complemento` VARCHAR(255) NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `estado` CHAR(2) NOT NULL,
    `bairro` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idEndereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `idPedido` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioCpf` CHAR(11) NOT NULL,
    `idEndereco` INTEGER NOT NULL,
    `valorTotal` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `dataCompra` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idCupom` INTEGER NULL,

    PRIMARY KEY (`idPedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagamento` (
    `idPagamento` INTEGER NOT NULL AUTO_INCREMENT,
    `idPedido` INTEGER NOT NULL,
    `metodo` VARCHAR(100) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `valorPago` DECIMAL(10, 2) NOT NULL,
    `dataPagamento` DATETIME(3) NULL,

    UNIQUE INDEX `Pagamento_idPedido_key`(`idPedido`),
    PRIMARY KEY (`idPagamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `idProduto` INTEGER NOT NULL AUTO_INCREMENT,
    `fotoVinho` TEXT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` TEXT NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `classificacao` DECIMAL(3, 2) NOT NULL,
    `categoria` VARCHAR(50) NOT NULL,
    `gustativo` TEXT NULL,
    `olfativo` TEXT NULL,
    `regiao` VARCHAR(150) NULL,
    `amadurecimento` TEXT NULL,
    `analises` TEXT NULL,
    `uvas` VARCHAR(255) NULL,
    `temperatura` VARCHAR(50) NULL,

    PRIMARY KEY (`idProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estoque` (
    `idEstoque` INTEGER NOT NULL AUTO_INCREMENT,
    `idProduto` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Estoque_idProduto_key`(`idProduto`),
    PRIMARY KEY (`idEstoque`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidoProduto` (
    `idPedidoProduto` INTEGER NOT NULL AUTO_INCREMENT,
    `idPedido` INTEGER NOT NULL,
    `idProduto` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `valorItem` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`idPedidoProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favoritos` (
    `idFavorito` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioCpf` CHAR(11) NOT NULL,
    `idProduto` INTEGER NOT NULL,

    PRIMARY KEY (`idFavorito`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Avaliacao` (
    `idAvaliacao` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioCpf` CHAR(11) NOT NULL,
    `idProduto` INTEGER NOT NULL,
    `avaliacao` DECIMAL(2, 1) NOT NULL,
    `conteudo` TEXT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idAvaliacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensagem` (
    `idMensagem` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioCpf` CHAR(11) NOT NULL,
    `assunto` VARCHAR(255) NOT NULL,
    `conteudo` TEXT NOT NULL,
    `dataEnvio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idMensagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cupom` (
    `idCupom` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(50) NOT NULL,
    `desconto` DECIMAL(5, 2) NOT NULL,

    UNIQUE INDEX `Cupom_codigo_key`(`codigo`),
    PRIMARY KEY (`idCupom`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_usuarioCpf_fkey` FOREIGN KEY (`usuarioCpf`) REFERENCES `User`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_usuarioCpf_fkey` FOREIGN KEY (`usuarioCpf`) REFERENCES `User`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idEndereco_fkey` FOREIGN KEY (`idEndereco`) REFERENCES `Endereco`(`idEndereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idCupom_fkey` FOREIGN KEY (`idCupom`) REFERENCES `Cupom`(`idCupom`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagamento` ADD CONSTRAINT `Pagamento_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`idPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estoque` ADD CONSTRAINT `Estoque_idProduto_fkey` FOREIGN KEY (`idProduto`) REFERENCES `Produto`(`idProduto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProduto` ADD CONSTRAINT `PedidoProduto_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`idPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProduto` ADD CONSTRAINT `PedidoProduto_idProduto_fkey` FOREIGN KEY (`idProduto`) REFERENCES `Produto`(`idProduto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favoritos` ADD CONSTRAINT `Favoritos_usuarioCpf_fkey` FOREIGN KEY (`usuarioCpf`) REFERENCES `User`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favoritos` ADD CONSTRAINT `Favoritos_idProduto_fkey` FOREIGN KEY (`idProduto`) REFERENCES `Produto`(`idProduto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_usuarioCpf_fkey` FOREIGN KEY (`usuarioCpf`) REFERENCES `User`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_idProduto_fkey` FOREIGN KEY (`idProduto`) REFERENCES `Produto`(`idProduto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_usuarioCpf_fkey` FOREIGN KEY (`usuarioCpf`) REFERENCES `User`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;
