import { list } from '../../models/produtoModels.js';

export default async function listProdutoController(req, res) {
    const result = await list ();

    return res.json(result);
}