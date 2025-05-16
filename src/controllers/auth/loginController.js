import { getByEmail, userValidator } from "../../models/userModels.js";
import { create } from "../../models/sessionModels.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export default async function loginController(req, res, next) {
  try {
    const user = req.body;

    // Validação dos dados do usuário (somente email e password)
    const validation = userValidator(user, { cpf: true, nome: true, telefone: true, nascimento: true, avatar: true, isAdmin: true, sexo: true });

    if (!validation.success) {
      return res.status(400).json({
        message: "Erro ao validar os dados do usuário",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Buscar o usuário pelo email
    const result = await getByEmail(validation.data.email);

    if (!result) {
      return res.status(400).json({
        message: "Usuário ou senha inválidos (usuário não encontrado)",
      });
    }

    // Comparar a senha
    const passIsValid = bcrypt.compareSync(validation.data.password, result.password);

    if (!passIsValid) {
      return res.status(400).json({
        message: "Usuário ou senha inválidos (senha não confere)",
      });
    }

    // dados para guardar no token (payload)
    const payload = {
      id: result.id,
      email: result.email,
      avatar: result.avatar,
      isAdmin: result.isAdmin 
    }

    const sessionResult = await create(result.id, req.headers['user-agent'])

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

    const refreshToken = jwt.sign({...payload, sessionId: sessionResult.id }, process.env.JWT_SECRET, { expiresIn: '3d' });


    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 3 * 24 * 60 * 60 * 1000 })


    return res.status(201).json({
      message: 'Login realizado com sucesso',
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        id: result.id,
        nome: result.nome,
        email: result.email,
        avatar: result.avatar
      }
    })

  } catch (error) {
    next(error)
  }
}
