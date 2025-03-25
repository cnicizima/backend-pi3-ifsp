import { getById } from '../../models/estoqueModels.js';

export default async function getEstoqueController(req, res) {
    const { idEstoque } = req.params;

    const result = await getById(+idEstoque);

    if (!result) {
        return res.status(404).json({
            message: 'Estoque não encontrado'
        });
    }

    return res.status(200).json({
        estoque: result
    });
}
