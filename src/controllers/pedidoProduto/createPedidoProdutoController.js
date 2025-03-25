import { create } from '../../models/pedidoProdutoModels.js';

export default async function createPedidoProdutoController(req, res) {
    const pedidoProduto = req.body;

    const result = await create(pedidoProduto);

    if (!result) {
        return res.status(500).json({ message: 'Erro ao criar PedidoProduto' });
    }

    return res.status(201).json({
        message: 'PedidoProduto criado com sucesso',
        pedidoProduto: result
    });
}
