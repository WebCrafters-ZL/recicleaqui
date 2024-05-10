// Importa o módulo que contém os modelos de banco de dados
const db = require("../db/models");

// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcryptjs");

// Função assíncrona para cadastrar um usuário e cliente
const clienteRegister = async function (req, res, next) {
  try {
    // Extrair os dados do corpo da requisição
    const {
      cnpj,
      razaoSocial,
      nomeFantasia,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      email,
      telefoneEmpresa,
      responsavel,
      telefoneResponsavel,
      senha,
      confirmarSenha,
    } = req.body;

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      const error = new Error("As senhas não coincidem");
      error.statusCode = 400;
      throw error; // Lança o erro para o próximo middleware de erro
    } else {
      // Verifica se o email e/ou o CNPJ já está cadastrado
      const existeUsuario = await db.Usuario.findOne({
        where: { email },
      });
      const existeCliente = await db.Cliente.findOne({
        where: { cnpj },
      });

      if (existeUsuario || existeCliente) {
        // Se os dados já estiverem cadastrados, retorna uma resposta de erro
        const error = new Error("CNPJ e/ou e-mail já cadastrado(s).");
        error.statusCode = 400;
        throw error; // Lança o erro para o próximo middleware de erro
      } else {
        // Criptografa a senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(senha, 10);

        const usuario = await db.Usuario.create({
          email,
          senha: hashedPassword,
          tipo: 'cliente',
        });

        // Cria um novo cliente
        await db.Cliente.create({
          cnpj,
          razaoSocial,
          nomeFantasia,
          cep,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          telefoneEmpresa,
          responsavel,
          telefoneResponsavel,
          usuario_id: usuario.id
        });

        // Redireciona para a rota de login após o cadastro bem-sucedido
        return res.redirect("/auth");
      }
    }
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

const clienteUpdate = async function (req, res, next) {
  try {
    // Extrair os dados do corpo da requisição
    const {
      cnpj,
      razaoSocial,
      nomeFantasia,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      email,
      telefoneEmpresa,
      responsavel,
      telefoneResponsavel,
      senha,
      confirmarSenha,
    } = req.body;

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      const error = new Error("As senhas não coincidem");
      error.statusCode = 400;
      throw error; // Lança o erro para o próximo middleware de erro
    } else {
      // Verifica se o email e/ou o CNPJ já está cadastrado em outro id de usuário
      const existeUsuario = await db.Usuario.findOne({
        where: { id: !req.session.usuario.id, email },
      });
      const existeCliente = await db.Cliente.findOne({
        where: { usuario_id: !req.session.usuario.id, cnpj },
      });

      if (existeUsuario || existeCliente) {
        // Se os dados já estiverem cadastrados, retorna uma resposta de erro
        const error = new Error("CNPJ e/ou e-mail já cadastrado(s).");
        error.statusCode = 400;
        throw error; // Lança o erro para o próximo middleware de erro
      } else {
        // Criptografa a senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(senha, 10);

        const usuario = db.Usuario.update({
          email,
          senha: hashedPassword,
        }, { where: { id: req.session.usuario.id } })
        // Atualiza os dados do cliente
        await db.Cliente.update({
          cnpj,
          razaoSocial,
          nomeFantasia,
          cep,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          telefoneEmpresa,
          responsavel,
          telefoneResponsavel,
          usuario_id: usuario.id,
        }, { where: { usuario_id: req.session.usuario.id } });

        // Redireciona para a própria página do perfil de usuário
        return res.redirect("/cliente/profile");
      }
    }
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

// Função assíncrona para excluir um cliente
const clienteDelete = async function (req, res, next) {
  try {
    await db.Cliente.destroy({ where: { usuario_id: req.session.usuario.id } });
    await db.Usuario.destroy({ where: { id: req.session.usuario.id } })
    res.redirect("/auth");
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

// Função para renderizar a página de cadastro
const registerView = function (req, res) {
  // Renderiza a view 'registerView' passando o título da página como parâmetro
  res.render("registerView", { title: "RecicleAqui - Cadastro" });
};

// Função responsável por renderizar a página de cliente
const clienteView = async function (req, res, next) {
  try {
    const dadosUsuario = await db.Usuario.findOne({
      where: { id: req.session.usuario.id }
    })
    const dadosCliente = await db.Cliente.findOne({
      where: { usuario_id: req.session.usuario.id },
    });
    // Renderiza a view 'clienteView' passando os dados do cliente como parâmetros
    res.render("clienteView", {
      title: "RecicleAqui - Perfil",
      cliente: dadosCliente,
      clienteId: dadosCliente.id,
      cnpj: dadosCliente.cnpj,
      razaoSocial: dadosCliente.razaoSocial,
      nomeFantasia: dadosCliente.nomeFantasia,
      cep: dadosCliente.cep,
      logradouro: dadosCliente.logradouro,
      numero: dadosCliente.numero,
      complemento: dadosCliente.complemento,
      bairro: dadosCliente.bairro,
      cidade: dadosCliente.cidade,
      estado: dadosCliente.estado,
      email: dadosUsuario.email,
      telefoneEmpresa: dadosCliente.telefoneEmpresa,
      responsavel: dadosCliente.responsavel,
      telefoneResponsavel: dadosCliente.telefoneResponsavel,
    });
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

// Exporta as funções para serem utilizadas por outros arquivos
module.exports = {
  clienteRegister,
  clienteUpdate,
  clienteDelete,
  registerView,
  clienteView,
};
