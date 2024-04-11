// Importa o módulo que contém os modelos de banco de dados
const db = require("../db/models");

// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcryptjs");

// Função assíncrona para realizar a autenticação de usuário
const loginAuth = async function (req, res) {
    try {
        // Extrai os dados de email e senha do corpo da requisição
        const { email, senha } = req.body;

        // Procura pelo usuário no banco de dados com o email fornecido
        const existeUsuario = await db.Usuario.findOne({ where: { email } });

        // Verifica se o usuário existe
        if (existeUsuario) {
            // Compara a senha fornecida com a senha armazenada no banco de dados
            const senhaCorreta = await bcrypt.compare(senha, existeUsuario.senha);

            // Se as senhas coincidirem, retorna uma mensagem de sucesso
            if (senhaCorreta) {
                return res.status(200).json({ msg: "Usuário autenticado" });
            } else {
                // Se as senhas não coincidirem, retorna um erro
                return res.status(400).json({ error: "E-mail e/ou senha não conferem." });
            }
        } else {
            // Se o usuário não existir, retorna um erro
            return res.status(400).json({ error: "O email não está cadastrado." });
        }
    } catch (error) {
        // Se ocorrer algum erro durante o processo, loga o erro e retorna uma resposta de erro
        console.error("Erro ao autenticar usuário:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

// Função responsável por renderizar a página de login
const loginView = function (req, res) {
    // Renderiza a view 'loginView' passando o título da página como parâmetro
    res.render("loginView", { title: "RecicleAqui - Login" });
}

// Exporta as funções 'loginAuth' e 'loginView' para serem utilizadas por outros arquivos
module.exports = {
    loginAuth,
    loginView
}
