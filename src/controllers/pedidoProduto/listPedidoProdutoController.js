import { list } from '../../models/pedidoProdutoModels.js';

export default async function listPedidoProdutoController(req, res) {
    const result = await list();
    
    return res.status(200).json(result);
}
