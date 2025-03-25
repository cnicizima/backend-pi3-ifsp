import { getById } from '../../models/pedidoModels.js';

export default async function getPedidoController(req, res) {
    const { idPedido } = req.params;

    const result = await getById(+idPedido);

    if (!result) {
        return res.status(404).json({ 
        error: 'Pedido não encontrado' });
    }

    return res.status(200).json({
        pedido: result
    })
}
