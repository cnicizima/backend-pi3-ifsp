import { update } from '../../models/estoqueModels.js';

export default async function updateEstoqueController(req, res) {
    const { idEstoque } = req.params;
    const estoque = req.body;

    const result = await update(+idEstoque, estoque);

    if (!result) {
        return res.status(404).json({
            error: 'Estoque não encontrado'
        });
    }

    return res.status(200).json({
        message: 'Estoque atualizado com sucesso',
        estoque: result
    });
}
