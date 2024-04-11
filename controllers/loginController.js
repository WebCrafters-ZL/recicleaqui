const db = require("../db/models"); // Importa o módulo que contém os modelos de banco de dados
const bcrypt = require("bcryptjs"); // Importa a biblioteca bcrypt para criptografar senhas

//  Função responsável por realizar a autenticação de usuário
const loginAuth = async function (req, res) {
    try {
        const { email, senha } = req.body;
        const existeUsuario = await db.Usuario.findOne({ where: { email } });
        if (existeUsuario) {
            const usuario = db.Usuario.findOne({
                attributes: ['email', 'senha', 'permissao'],
                where: { email }
            });
            const hashedPassword = await bcrypt.hash(senha, 10);
            if (hashedPassword === usuario.senha) {
                // Lógica do login
            }
        }
    } catch (err) {
        // Exceção
    }
}

// Função responsável por renderizar a página de login
const loginView = function (req, res) {
    res.render("loginView", { title: "RecicleAqui - Login" }); // Renderiza a view 'loginView' passando o título da página como parâmetro
}

// Exporta a função 'loginView' para ser utilizada por outros arquivos
module.exports = {
    loginAuth,
    loginView
}
