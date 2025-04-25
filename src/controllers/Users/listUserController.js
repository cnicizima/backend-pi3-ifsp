import { list } from '../../models/userModels.js';

export default async function listUserController(req, res) {
    try {
        const result = await list();

        return res.status(200).json(result);
    } catch (err) {
        console.error("Erro ao listar usuários:", err);
        return res.status(500).json({
            message: "Erro interno do servidor.",
        });
    }
}