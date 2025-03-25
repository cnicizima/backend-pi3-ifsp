import { remove } from '../../models/pagamentoModels.js';

export default async function deletePagamentoController(req, res) {
    const { idPagamento } = req.params;

    const result = await remove(Number(idPagamento));

    if (!result) {
        return res.status(500).json({ message: 'Erro ao deletar pagamento' });
    }

    return res.status(200).json({ message: 'Pagamento removido com sucesso' });
}
