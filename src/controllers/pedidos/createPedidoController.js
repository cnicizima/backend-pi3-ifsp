import { create } from '../../models/pedidoModels.js';

export default async function createPedidoController(req, res) {
    const pedido = req.body;

    const result = await create(pedido);

    if (!result) {
        return res.status(500).json({ 
            message: 'Erro ao criar pedido'
        });
    }

    return res.status(201).json({ 
        message: 'Pedido criado com sucesso',
        pedido: result    
    });
}
