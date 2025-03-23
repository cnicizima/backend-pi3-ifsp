import { list } from '../../models/enderecoModels.js';

export default async function listEnderecoController ( req, res ) {
    const result = await list ();
    return res.json(result);
}