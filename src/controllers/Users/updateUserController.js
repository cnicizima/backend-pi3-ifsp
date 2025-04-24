import { update, userValidator } from '../../models/userModels.js';

export default async function updateUserController(req, res) {
    const { id } = req.params;
    const validation = userValidator(req.body); // Remove partial, require all fields
    
    if (!validation.success) {
        return res.status(400).json({
            message: 'Erro de validação',
            errors: validation.error.format()
        });
    }

    try {
        const result = await update(+id, validation.data);
        
        if (!result) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        delete result.password;
        
        return res.status(200).json({
            message: "Usuário atualizado com sucesso",
            user: result
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar usuário",
            error: error.message
        });
    }
}