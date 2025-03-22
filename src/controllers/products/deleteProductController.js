import { remove } from '../../models/productModels.js';

export default async function deleteProductController (req, res){

    const { id } = req.params
    
    const result = await remove(+id)

    if(!result){
      return res.status(404).json({
        error: "Usuário não encontrado"
      })
    }

    return res.json({
      message: "usuário removido com sucesso",
      user: result
    })

  }

