import { update } from '../../models/userModels.js';

export default async function updateUserController(req, res) {
    const { id } = req.params;
    const user = req.body;

    const result = await update (+id, user)
    // o '+' converte a informação para um Number (garante que seja um numero)
  
    
    if(!result){
      return res.status(404).json({
        error: "Usuário não encontrado"
      })
    }
  
    return res.status(200).json({
      message: "usuário atualizado com sucesso",
      user: result
    })
  }
  
  