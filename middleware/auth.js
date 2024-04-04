const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Exportação do middleware de autenticação de administrador
module.exports = {
    // Middleware para verificar se o usuário é um administrador
    eAdmin: async function (req, res, next) {
        // Verifica se o cabeçalho de autorização está presente na requisição
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            // Retorna um erro caso o cabeçalho de autorização não esteja presente
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        }

        // Divide o token do cabeçalho
        const [, token] = authHeader.split(' ');

        // Verifica se o token está presente
        if (!token) {
            // Retorna um erro caso o token não esteja presente
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        }

        // Verifica se o token é válido e decodifica o usuário
        try {
            const decode = await promisify(jwt.verify)(token, "FJ29AK1K69H0ASC82N51929ADU2JH1DH24H9023JUF1DI21N4J12");
            // Define o ID do usuário decodificado na requisição
            req.userID = decode.id;
            return next();
        } catch (err) {
            // Retorna um erro caso o token seja inválido
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        }
    }
}
