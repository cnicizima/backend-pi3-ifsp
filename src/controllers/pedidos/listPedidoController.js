import { list } from '../../models/pedidoModels.js';

export default async function listPedidoController(req, res) {
    const pedidos = await list();
    return res.status(200).json(pedidos);
}
