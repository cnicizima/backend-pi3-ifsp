import { create } from '../../models/pagamentoModels.js';

export default async function createPagamentoController(req, res) {
    const pagamento = req.body;

    const result = await create(pagamento);

    if (!result) {
        return res.status(500).json({ message: 'Erro ao criar pagamento' });
    }

    return res.status(201).json({
        message: 'Pagamento criado com sucesso',
        pagamento: result
    });
}
