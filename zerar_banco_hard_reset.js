import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Desativando restrições de chaves estrangeiras...');
    await prisma.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`); // Desativa as restrições de chaves estrangeiras

    console.log('Apagando dados das tabelas...');
    await prisma.$executeRawUnsafe(`DELETE FROM Pagamento;`);
    await prisma.$executeRawUnsafe(`DELETE FROM PedidoProduto;`);
    await prisma.$executeRawUnsafe(`DELETE FROM Pedido;`);
    await prisma.$executeRawUnsafe(`DELETE FROM Estoque;`);
    await prisma.$executeRawUnsafe(`DELETE FROM Produto;`);
    await prisma.$executeRawUnsafe(`DELETE FROM Endereco;`);
    await prisma.$executeRawUnsafe(`DELETE FROM Favoritos;`);
    await prisma.$executeRawUnsafe(`DELETE FROM Avaliacao;`);
    await prisma.$executeRawUnsafe(`DELETE FROM Mensagem;`);
    await prisma.$executeRawUnsafe(`DELETE FROM Cupom;`);
    await prisma.$executeRawUnsafe(`DELETE FROM Session;`);
    await prisma.$executeRawUnsafe(`DELETE FROM User;`);

    console.log('Reiniciando IDs autoincrementados...');
    await prisma.$executeRawUnsafe(`
        DELETE FROM sqlite_sequence WHERE name IN (
            'Pagamento',
            'PedidoProduto',
            'Pedido',
            'Estoque',
            'Produto',
            'Endereco',
            'Favoritos',
            'Avaliacao',
            'Mensagem',
            'Cupom',
            'Session',
            'User'
        );
    `);

    console.log('Reativando restrições de chaves estrangeiras...');
    await prisma.$executeRawUnsafe(`PRAGMA foreign_keys = ON;`); // Reativa as restrições de chaves estrangeiras

    console.log('Banco de dados zerado com sucesso.');
}

main()
    .catch((e) => {
        console.error('Erro ao zerar o banco de dados:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });