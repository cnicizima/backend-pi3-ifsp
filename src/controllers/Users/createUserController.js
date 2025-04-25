import { create } from '../../models/userModels.js';

export default async function createUserController(req, res){
    const user = req.body;

    const result = await create(user);

    if(!result){
        return res.status(500).json({ 
          message: 'Erro ao criar usuário'
        })
      }
  
      delete result.pass //para nao enviar a senha no json de retorno
  
      return res.status(201).json({ 
        message: 'Usuário criado com sucesso',
        user: result    
      })
    }
  