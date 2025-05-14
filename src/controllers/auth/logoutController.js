import { remove } from "../../models/sessionModel.js";
import jwt from "jsonwebtoken"; 

const logoutController = async (req, res, next) => {
    try {
        let refreshToken = req?.body?.refreshToken;
        refreshToken = refreshToken || req?.cookies?.refreshToken; //tenta pegar do body ou senão do cookie.
    
        if(!refreshToken) {
            return res.status(200).json({ message: "Você já está deslogado"})
        }
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)

            await remove(decoded.sessionId, decoded.id) //remove a sessão do banco de dados
            return res.json({ message: "Logout realizado com sucesso" })
            
    
    } catch (error) {
        console.log(error.name) //pra pegar o nome do erro. Depois que fizer, pode apagar ou comentar.
        console.log(error.message) // pra pegar e msg do erro e poder fazer os ifs abaixo
        if (error.name === "JsonWebTokenError" && error.message === "invalid token") {
            return res.status(401).json({ message: "Token inválido" });
        } 
        if (error.name === "JsonWebTokenError" && error.message === "invalid signature") {
            return res.status(401).json({ message: "Assinatura Token inválida" });
        }
        if (error.name === "TokenExpiredError" && error.message === "jwt expired") {
            return res.status(401).json({ message: "Token expirado!" });
        }
        next(error)
    }
}

export default logoutController;