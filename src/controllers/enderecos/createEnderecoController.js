import { create } from '../../models/enderecoModels.js';

export default async function createEnderecoController( req, res ) {

    const endereco = req.body;

    const result = await create( endereco );

    if(!result){
        return res.status(500).json({ 
          message: 'Erro ao criar endereço'
        })
      }
  
      return res.status(201).json({ 
        message: 'endereco criado com sucesso',
        endereco: result    
      })

}

// O usuarioCPF deve ser o mesmo ja cadastrado no banco para ser passado aqui. para ele associar o endereço ao cpf do usuario