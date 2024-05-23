// Importa o modelo de Cliente e Usuario
const Cliente = require("../db/models").Cliente;
const Usuario = require("../db/models").Usuario;

// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcryptjs");

const cadastrarCliente = async function (req, res, next) {
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
      const existeUsuario = await Usuario.findOne({ where: { email } });
      const existeCliente = await Cliente.findOne({ where: { cnpj } });

      if (existeUsuario || existeCliente) {
        // Se os dados já estiverem cadastrados, retorna uma resposta de erro
        const error = new Error("CNPJ e/ou e-mail já cadastrado(s).");
        error.statusCode = 400;
        throw error; // Lança o erro para o próximo middleware de erro
      } else {
        // Criptografa a senha antes de salvar no banco de dados
        const hashSenha = await bcrypt.hash(senha, 10);

        // Cria um novo usuário
        const usuario = await Usuario.create({
          email,
          senha: hashSenha,
          tipo: 'cliente',
        });

        // Cria um novo cliente, referenciando o usuário criado
        await Cliente.create({
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

const atualizarCliente = async function (req, res, next) {
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
      const existeUsuario = await Usuario.findOne({
        where: { id: !req.session.usuario.id, email },
      });
      const existeCliente = await Cliente.findOne({
        where: { usuario_id: !req.session.usuario.id, cnpj },
      });

      if (existeUsuario || existeCliente) {
        // Se os dados já estiverem cadastrados, retorna uma resposta de erro
        const error = new Error("CNPJ e/ou e-mail já cadastrado(s).");
        error.statusCode = 400;
        throw error; // Lança o erro para o próximo middleware de erro
      } else {
        // Criptografa a senha antes de salvar no banco de dados
        const hashSenha = await bcrypt.hash(senha, 10);

        await Usuario.update({
          email,
          senha: hashSenha,
        }, { where: { id: req.session.usuario.id } })

        // Atualiza os dados do cliente
        await Cliente.update({
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
        }, { where: { usuario_id: req.session.usuario.id } });

        // Redireciona para a própria página do perfil de usuário
        return res.redirect("/cliente");
      }
    }
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

const excluirCliente = async function (req, res, next) {
  try {
    await Cliente.destroy({ where: { usuario_id: req.session.usuario.id } });
    await Usuario.destroy({ where: { id: req.session.usuario.id } })
    res.redirect("/auth/logout");
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

const cadastroClienteView = function (req, res) {
  // Renderiza a view 'cadastroClienteView' passando o título da página como parâmetro
  res.render("cadastroClienteView", { title: "RecicleAqui - Cadastro de Cliente" });
};

const clienteView = async function (req, res, next) {
  try {
    const dadosUsuario = await Usuario.findOne({
      where: { id: req.session.usuario.id }
    })
    const dadosCliente = await Cliente.findOne({
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

const agendamentoView = function (req, res) {
  // Renderiza a view 'agendamentoView' passando o título da página como parâmetro
  res.render("agendamentoView", { title: "RecicleAqui - Agendamento" });
}

module.exports = {
  cadastrarCliente,
  atualizarCliente,
  excluirCliente,
  cadastroClienteView,
  clienteView,
  agendamentoView
};
