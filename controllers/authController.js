// Importa o módulo que contém os modelos de banco de dados
const db = require("../db/models");

// Importa os operadores do Sequelize
const { Op } = require("sequelize");

// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcryptjs");

// Importa a biblioteca crypto para gerar o token de redefinição de senha
const crypto = require('crypto');

// Importa o transporter configurado
const transporter = require('../config/nodemailer');

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
        // Redireciona o usuário com base no tipo de usuário
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
      const error = new Error("O e-mail não está cadastrado.");
      error.statusCode = 400;
      throw error; // Lança o erro para o próximo middleware de erro
    }
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

// Função para realizar o logout do usuário
const authLogout = function (req, res) {
  // Destrói a sessão de usuário
  req.session.destroy(function (err) {
    res.redirect("/auth"); // Redireciona para a página de logins
  });
};

// Função responsável por renderizar a página de login
const authView = function (req, res) {
  // Renderiza a view 'authView' passando o título da página como parâmetro
  res.render("authView", { title: "RecicleAqui - Login" });
};

// Função para recuperar a senha do usuário
const authRecuperarSenha = async function (req, res, next) {
  const { emailRecuperacao } = req.body;
  try {
    // Verifica se o e-mail fornecido está cadastrado
    const existeUsuario = await db.Usuario.findOne({ where: { email: emailRecuperacao } });
    if (!existeUsuario) {
      const error = new Error("E-mail não encontrado");
      error.statusCode = 400;
      throw error; // Lança o erro para o próximo middleware de erro
    }
    // Gera um token único para o usuário
    const token = crypto.randomBytes(20).toString('hex');
    // Define o link para redefinição de senha
    const resetLink = `http://localhost:${process.env.APP_PORT}/auth/redefinir-senha/${token}`;
    // Atualiza as informações do usuário no banco de dados
    existeUsuario.tokenRedefinicaoSenha = token;
    existeUsuario.expiracaoTokenRedefinicaoSenha = Date.now() + 3600000; // 1 hora
    await existeUsuario.save();
    // Envia um e-mail de recuperação de senha para o usuário
    transporter.sendMail({
      from: 'contato@recicleaqui.app',
      to: existeUsuario.email,
      subject: 'Recuperação de Senha',
      html: `<p>Você solicitou a recuperação de senha.</p>
      <p>Clique no <a href="${resetLink}">link</a> para redefinir sua senha.</p>`
    });
  } catch (error) {
    next(error);
  }
};

// Função para renderizar a página de redefinição de senha
const authRedefinirSenhaView = async function (req, res, next) {
  try {
    // Verifica se o token de redefinição de senha é válido e ainda não expirou
    const existeUsuario = await db.Usuario.findOne({
      where:
      {
        tokenRedefinicaoSenha: req.params.token,
        expiracaoTokenRedefinicaoSenha: { [Op.gte]: Date.now() }
      }
    });
    if (existeUsuario) {
      res.render("redefinirSenhaView", { title: "RecicleAqui - Redefinir Senha", token: req.params.token })
    } else {
      // Se o token não for válido ou expirou, retorna um erro
      const error = new Error("Token inválido ou expirado");
      error.statusCode = 400;
      throw error; // Lança o erro para o próximo middleware de erro
    }
  } catch (error) {
    next(error);
  }
}

// Função para redefinir a senha do usuário
const authRedefinirSenha = async function (req, res, next) {
  try {
    const { senha, confirmarSenha } = req.body;
    // Verifica se as senhas fornecidas coincidem
    if (senha !== confirmarSenha) {
      const error = new Error("As senhas não coincidem");
      error.statusCode = 400;
      throw error; // Lança o erro para o próximo middleware de erro
    }
    // Procura pelo usuário com o token de redefinição de senha fornecido
    const existeUsuario = await db.Usuario.findOne({
      where:
      {
        tokenRedefinicaoSenha: req.params.token,
        expiracaoTokenRedefinicaoSenha: { [Op.gte]: Date.now() }
      }
    })
    if (!existeUsuario) {
      // Se o usuário não for encontrado, retorna um erro
      const error = new Error("Token inválido ou expirado");
      error.statusCode = 400;
      throw error; // Lança o erro para o próximo middleware de erro
    }
    // Criptografa a nova senha e atualiza as informações do usuário no banco de dados
    const hashSenha = await bcrypt.hash(senha, 10);
    existeUsuario.senha = hashSenha;
    existeUsuario.tokenRedefinicaoSenha = undefined;
    existeUsuario.expiracaoTokenRedefinicaoSenha = undefined;
    await existeUsuario.save();
    // Redireciona o usuário para a página de login após redefinir a senha
    res.redirect("/auth");
  } catch (error) {
    next(error);
  }
}

// Exporta as funções para serem utilizadas por outros arquivos
module.exports = {
  authLogin,
  authLogout,
  authView,
  authRecuperarSenha,
  authRedefinirSenhaView,
  authRedefinirSenha
};
