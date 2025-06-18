import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const accessToken = req.headers["authorization"]?.split(' ')[1];

    if(!actionToken) {
        return res.status(401).json({ message: "Token de autenticação não fornecido" });
    }

    //retorna err ou decoded
    jwt.verify(actionToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: "Token inválido ou expirado" });
        }

        req.userLogged = decoded; // Armazena os dados decodificados do token no objeto de requisição. Como é um middleware, todos os middlewares que estão pra frente, tem acesso a este dado.

        next(); // Chama o próximo middleware ou rota
    })
}