import { create, userValidator } from '../../models/userModels.js';

export default async function createUserController(req, res){
    const validation = userValidator(req.body);
    
    if (!validation.success) {
        return res.status(400).json({
            message: 'Erro de validação',
            errors: validation.error.format()
        });
    }

    const result = await create(validation.data);

    if(!result){
        return res.status(500).json({ 
            message: 'Erro ao criar usuário'
        });
    }

    delete result.password;

    return res.status(201).json({ 
        message: 'Usuário criado com sucesso',
        user: result    
    });
}