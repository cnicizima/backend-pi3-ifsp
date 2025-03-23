import { remove } from '../../models/produtoModels.js';

export default async function deleteProdutoController (req, res){

    const { idProduto } = req.params
    
    const result = await remove(+idProduto)

    if(!result){
      return res.status(404).json({
        error: "Produto não encontrado"
      })
    }

    return res.json({
      message: "Produto removido com sucesso",
      produto: result
    })

  }

