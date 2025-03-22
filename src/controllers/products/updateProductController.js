import { update } from  '../../models/productModels.js';

export default async function updateProductController (req, res) {
    const { id } = req.params;
    const product = req.body;

    const result = await update (id, product);

    if (!result) {
        return res.status(404).json({
            error: 'Produto não atualizado'
        })
    }
    return res.status(200).json({
        message: 'Produto atualziado com sucesso',
        product: result
    })
}