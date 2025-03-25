import { remove } from '../../models/pedidoModels.js';

export default async function deletePedidoController(req, res) {
    const { idPedido } = req.params;

    const result = await remove(+idPedido);

    if (!result) {
        return res.status(404).json({ 
            message: 'Erro ao deletar pedido'
        });
    }
    return res.status(200).json({
        message: "Pedido removido com sucesso",
        endereco: result
    })
}
