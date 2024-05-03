// Importa o módulo que contém os modelos de banco de dados
const db = require("../db/models");

// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcryptjs");

// Função assíncrona para realizar a autenticação de usuário
const authLogin = async function (req, res) {
  try {
    // Extrai os dados de email e senha do corpo da requisição
    const { email, senha } = req.body;

    // Procura pelo usuário no banco de dados com o email fornecido
    const existeCliente = await db.Cliente.findOne({ where: { email } });

    // Verifica se o usuário existe
    if (existeCliente) {
      // Compara a senha fornecida com a senha armazenada no banco de dados
      const senhaCorreta = await bcrypt.compare(senha, existeCliente.senha);

      // Se as senhas coincidirem, retorna uma mensagem de sucesso
      if (senhaCorreta) {
        req.session.cliente = existeCliente;
        return res.redirect("/cliente/profile");
      } else {
        // Se as senhas não coincidirem, retorna um erro
        return res
          .status(400)
          .json({ error: "E-mail e/ou senha não conferem." });
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
};

// Função responsável por renderizar a página de login
const authView = function (req, res) {
  // Renderiza a view 'authView' passando o título da página como parâmetro
  res.render("authView", { title: "RecicleAqui - Login" });
};

// Exporta as funções 'authLogin' e 'authView' para serem utilizadas por outros arquivos
module.exports = {
  authLogin,
  authView,
};
