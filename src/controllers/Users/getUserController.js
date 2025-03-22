import { getById } from '../../models/userModels.js' 

export default async function getUserController(req, res) {

  const { id } = req.params;

  const result = await getById (+id);

  if(!result) {
    return res.status (404).json({ message: 'Usuário não encontrado'})
  }

  return res.status(200).json({
    user: result
  })
}