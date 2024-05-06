// Middleware para tratamento de erros
const tratarNaoEncontrado = function (req, res, next) {
    const error = new Error(`Recurso não encontrado: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error); // Passa o erro para o próximo middleware de erro
};

const tratarErros = (err, req, res, next) => {
    // Renderiza a view de erros com os detalhes do erro
    res.status(500).render('errorView', { error: err });
};

module.exports = { tratarNaoEncontrado, tratarErros };
