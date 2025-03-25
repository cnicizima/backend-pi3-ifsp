import { getById } from '../../models/pedidoProdutoModels.js';

export default async function getPedidoProdutoController(req, res) {
    const { idPedidoProduto } = req.params;

    const result = await getById(Number(idPedidoProduto));

    if (!result) {
        return res.status(404).json({ message: 'PedidoProduto não encontrado' });
    }

    return res.status(200).json({
        pedidoProduto: result
    });
}
