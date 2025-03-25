import { update } from '../../models/pagamentoModels.js';

export default async function updatePagamentoController(req, res) {
    const { idPagamento } = req.params;
    const pagamento = req.body;

    const result = await update(Number(idPagamento), pagamento);

    if (!result) {
        return res.status(500).json({ message: 'Erro ao atualizar pagamento' });
    }

    return res.status(200).json({
        message: 'Pagamento atualizado com sucesso',
        pagamento: result
    });
}
