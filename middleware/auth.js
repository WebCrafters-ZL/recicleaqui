const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
    eAdmin: async function(req, res, next) {
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(400).json({
                erro: true,
                //Erro: Necessário realizar o login para acessar a página! Faltam o token A!
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        }

        const [, token ]= authHeader.split(' ');
        console.log("Token: " + token);

        if(!token){
            return res.status(400).json({
                erro: true,
                //Erro: Necessário realizar o login para acessar a página! Faltam o token B!
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        }
        //Verifica se o token permanece válido dentro do prazo estipulado de 7dias
        try{
            const decode = await promisify(jwt.verify)(token, "FJ29AK1K69H0ASC82N51929ADU2JH1DH24H9023JUF1DI21N4J12");
            req.userID = decode.id;
            return next();
        }catch(err){
            return res.status(400).json({
                erro: true,
                //Erro: Necessário realizar o login para acessar a página! Token inválido!
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        }
    }
}