// Importa o módulo que contém os modelos de banco de dados
const db = require("../db/models");

// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcryptjs");

// Função assíncrona para realizar a autenticação de usuário
const authLogin = async function (req, res, next) { // Adicione o parâmetro 'next' para passar os erros para o próximo middleware
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
        req.session.usuario = {
          id: existeUsuario.id,
          email: existeUsuario.email,
          tipo: existeUsuario.tipo
        };
        switch (req.session.usuario.tipo) {
          case "administrador":
            return res.redirect("/admin");
          case "funcionario":
            return res.redirect("/funcionario");
          case "cliente":
            return res.redirect("/cliente");
          default:
            break;
        }

      } else {
        // Se as senhas não coincidirem, retorna um erro
        const error = new Error("E-mail e/ou senha não conferem.");
        error.statusCode = 400;
        throw error; // Lança o erro para o próximo middleware de erro
      }
    } else {
      // Se o usuário não existir, retorna um erro
      const error = new Error("O email não está cadastrado.");
      error.statusCode = 400;
      throw error; // Lança o erro para o próximo middleware de erro
    }
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

//  Função para realizar o logout do usuário
const authLogout = function (req, res) {
  req.session.destroy(function (err) { // Destrói a sessão de usuário
    res.redirect("/auth"); // Redireciona para a página de logins
  });
};

// Função responsável por renderizar a página de login
const authView = function (req, res) {
  // Renderiza a view 'authView' passando o título da página como parâmetro
  res.render("authView", { title: "RecicleAqui - Login" });
};

// Exporta as funções 'authLogin' e 'authView' para serem utilizadas por outros arquivos
module.exports = {
  authLogin,
  authLogout,
  authView,
};
