import { remove } from '../../models/estoqueModels.js';

export default async function deleteEstoqueController(req, res) {
    const { idEstoque } = req.params;
    const result = await remove(+idEstoque);

    if (!result) {
        return res.status(404).json({
            error: 'Estoque não encontrado'
        });
    }

    return res.json({
        message: 'Estoque removido com sucesso',
        estoque: result
    });
}
