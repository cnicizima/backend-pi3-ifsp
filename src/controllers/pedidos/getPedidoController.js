import { getByCpf } from "../../models/pedidoModels.js";
import jwt from "jsonwebtoken";

export default async function getPedidoController(req, res, next) {
  try {
    // Recupera o token JWT do cookie
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido." });
    }

    // Decodifica o token para obter o CPF do usuário
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { cpf } = decoded;

    if (!cpf) {
      return res.status(400).json({ message: "CPF não encontrado no token." });
    }

    // Busca os pedidos pelo CPF
    const pedidos = await getByCpf(cpf);

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: "Nenhum pedido encontrado para este usuário." });
    }

    return res.status(200).json(pedidos);
  } catch (error) {
    next(error);
  }
}