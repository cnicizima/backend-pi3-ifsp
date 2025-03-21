import { remove } from '../../models/userModels.js';

export default async function deleteUserController(req, res){

    const { id } = req.params;
    const result = await remove(+id);

    if(!result){
        return res.status(404).json({
          error: "Usuário não encontrado"
        })
      }
  
      return res.status(200).json({
        message: "usuário removido com sucesso",
        user: result
      })
  
    }
  
  