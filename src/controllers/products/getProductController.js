import { getById } from '../../models/productModels.js';

export default async function getProductController( req, res) {
    const { id } = req.params;
    const result = await getById(+id);

    if(!result){
        return res.send(404).json({
            error: "Produto não encontrado"
        })
    }

    return res.status(200).json({
        product: result
    })
}