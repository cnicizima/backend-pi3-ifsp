import { remove } from '../../models/enderecoModels.js';

export default async function deleteEnderecoController ( req, res ) {
    const { idEndereco } = req.params;

    const result = await remove( +idEndereco );

    if(!result) {
        return res.status(404).json({
            error: "Endereco não encontrado"
        })
    }

    return res.status(200).json({
        message: "Endereco removido com sucesso",
        endereco: result
    })
}