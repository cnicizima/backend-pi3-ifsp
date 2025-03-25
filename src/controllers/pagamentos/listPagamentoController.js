import { list } from '../../models/pagamentoModels.js';

export default async function listPagamentoController(req, res) {
    const result = await list();
    return res.status(200).json(result);
}
