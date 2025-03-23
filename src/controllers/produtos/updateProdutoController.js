import { update } from  '../../models/produtoModels.js';

export default async function updateProdutoController (req, res) {
    const { idProduto } = req.params;
    const produto = req.body;

    const result = await update (+idProduto, produto);

    if (!result) {
        return res.status(404).json({
            error: 'Produto não atualizado'
        })
    }
    return res.status(200).json({
        message: 'Produto atualizado com sucesso',
        produto: result
    })
}