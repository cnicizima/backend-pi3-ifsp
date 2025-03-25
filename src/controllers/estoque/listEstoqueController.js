import { list } from '../../models/estoqueModels.js'

export default async function listEstoqueController(req, res) {

    const result = await list();

    return res.json(result)

}