import { remove, userValidator } from '../../models/userModels.js';

export default async function deleteUserController(req, res) {
  try {
      const { id } = req.params;

      if (!id || isNaN(+id)) {
          return res.status(400).json({
              message: "ID inválido. Certifique-se de que o ID é um número válido.",
          });
      }

      const user = { id: +id };
      const { success, error } = userValidator(user, { name: true, email: true, pass: true });

      if (!success) {
          return res.status(400).json({
              message: "Erro ao validar os dados do usuário!",
              errors: error.flatten().fieldErrors,
          });
      }

       const result = await remove(+id);

       if (!result) {
           return res.status(404).json({
               message: "Usuário não encontrado.",
           });
       }

       return res.status(200).json({
           message: "Usuário removido com sucesso.",
           user: result,
       });
   } catch (err) {
    
       // Tratamento de erros inesperados
       console.error("Erro ao deletar usuário:", err);
       return res.status(500).json({
           message: "Erro interno do servidor. Tente novamente mais tarde.",
       });
   }
}