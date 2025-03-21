import { create } from '../../models/productModels.js';

export default async function createProductController(req, res) {

    const product = req.body;

    const result = await create(product)

    
    if(!result){
        return res.status(500).json({ 
          message: 'Erro ao criar produto'
        })
      }
  
      delete result.pass //para nao enviar a senha no json de retorno
  
      return res.status(201).json({ 
        message: 'Produto criado com sucesso',
        user: result    
      })

}