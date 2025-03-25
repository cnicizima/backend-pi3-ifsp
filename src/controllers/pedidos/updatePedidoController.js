import { update } from '../../models/pedidoModels.js';

export default async function updatePedidoController(req, res) {
    const { idPedido } = req.params;
    const pedido = req.body;

    const result = await update(+idPedido, pedido);

    if (!result) {
        return res.status(500).json({ 
            message: 'Erro ao atualizar pedido'
        });
    }

    return res.status(200).json({ 
        message: 'Pedido atualizado com sucesso',
        pedido: result
    });
}
