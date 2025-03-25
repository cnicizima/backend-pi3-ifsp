import { update } from '../../models/pedidoProdutoModels.js';

export default async function updatePedidoProdutoController(req, res) {
    const { idPedidoProduto } = req.params;
    const pedidoProduto = req.body;

    const result = await update(Number(idPedidoProduto), pedidoProduto);

    if (!result) {
        return res.status(500).json({ message: 'Erro ao atualizar PedidoProduto' });
    }

    return res.status(200).json({
        message: 'PedidoProduto atualizado com sucesso',
        pedidoProduto: result
    });
}
