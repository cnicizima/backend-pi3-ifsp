import { create } from '../../models/produtoModels.js';

export default async function createProdutoController(req, res) {

    const produto = req.body;

    const result = await create(produto)

    
    if(!result){
        return res.status(500).json({ 
          message: 'Erro ao criar produto'
        })
      }
  
      delete result.pass //para nao enviar a senha no json de retorno
  
      return res.status(201).json({ 
        message: 'Produto criado com sucesso',
        produto: result    
      })

}