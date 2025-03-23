import { update } from '../../models/enderecoModels.js'

export default async function updateEnderecoController (req, res){
    const { idEndereco } = req.params;
    const endereco = req.body;
    const result = await update (+idEndereco, endereco);

    if(!result){
        return res.send(404).json({
            error: 'Endereco não encontrado'
        })
    }
    return res.status(200).json({
        message: 'Endereco atualizado com sucesso',
        endereco: result
    });
}