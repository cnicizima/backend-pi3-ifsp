import { remove } from '../../models/pedidoProdutoModels.js';

export default async function deletePedidoProdutoController(req, res) {
    const { idPedidoProduto } = req.params;

    const result = await remove(Number(idPedidoProduto));

    if (!result) {
        return res.status(500).json({ message: 'Erro ao excluir PedidoProduto' });
    }

    return res.status(200).json({
        message: 'PedidoProduto excluído com sucesso',
        pedidoProduto: result
    });
}
