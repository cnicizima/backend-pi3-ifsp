import { getById } from '../../models/produtoModels.js';

export default async function getProdutoController( req, res) {
    const { idProduto } = req.params;
    const result = await getById(+idProduto);

    if(!result){
        return res.send(404).json({
            error: "Produto não encontrado"
        })
    }

    return res.status(200).json({
        product: result
    })
}