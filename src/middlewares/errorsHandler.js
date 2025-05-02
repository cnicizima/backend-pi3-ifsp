export const errorsHandler = (error, req, res, next) => {
    console.log("-------------error handler-------------")
    console.log(error);
    return res.status(500).json({
        message:"Ocorreu um erro inesperado",
        // error: error.message, nao devemos usar este error porque vai mostrar todas as informações para o usuario.
    })
}

