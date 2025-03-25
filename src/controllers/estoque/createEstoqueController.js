import { create } from '../../models/estoqueModels.js';

export default async function createEstoqueController(req, res) {
    const estoque = req.body;

    const result = await create(estoque);

    if (!result) {
        return res.status(500).json({
            message: 'Erro ao criar estoque'
        });
    }

    return res.status(201).json({
        message: 'Estoque criado com sucesso',
        estoque: result
    });
}
