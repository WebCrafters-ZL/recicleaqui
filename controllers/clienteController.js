// Importa o módulo que contém os modelos de banco de dados
const db = require("../db/models");

// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcryptjs");

// Função assíncrona para cadastrar um usuário e cliente
const clienteRegister = async function (req, res) {
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
      return res.status(400).json({ error: "As senhas não coincidem." });
    } else {
      // Verifica se o email e/ou o CNPJ já está cadastrado
      const existeCliente = await db.Cliente.findOne({
        where: { cnpj, email },
      });

      if (existeCliente) {
        // Se os dados já estiverem cadastrados, retorna uma resposta de erro
        return res
          .status(400)
          .json({ error: "CNPJ e/ou e-mail já cadastrado(s)." });
      } else {
        // Criptografa a senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(senha, 10);

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
          email,
          telefoneEmpresa,
          responsavel,
          telefoneResponsavel,
          senha: hashedPassword,
        });

        // Redireciona para a rota de login após o cadastro bem-sucedido
        return res.redirect("/auth");
      }
    }
  } catch (error) {
    // Se ocorrer algum erro durante o processo, loga o erro e retorna uma resposta de erro
    console.error("Erro ao cadastrar cliente:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const clienteUpdate = async function (req, res) {
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
      return res.status(400).json({ error: "As senhas não coincidem." });
    } else {
      // Verifica se o email e/ou o CNPJ já está cadastrado
      const existeCliente = await db.Cliente.findOne({
        where: { id: !req.session.cliente.id, cnpj, email },
      });

      if (existeCliente) {
        // Se os dados já estiverem cadastrados, retorna uma resposta de erro
        return res
          .status(400)
          .json({ error: "CNPJ e/ou e-mail já cadastrado(s)." });
      } else {
        // Criptografa a senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria um novo cliente
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
          email,
          telefoneEmpresa,
          responsavel,
          telefoneResponsavel,
          senha: hashedPassword,
        }, { where: { id: req.session.cliente.id } });

        // Redireciona para a rota de login após o cadastro bem-sucedido
        return res.redirect("/cliente/profile");
      }
    }
  } catch (error) {
    // Se ocorrer algum erro durante o processo, loga o erro e retorna uma resposta de erro
    console.error("Erro ao cadastrar cliente:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função assíncrona para excluir um cliente
const clienteDelete = async function (req, res) {
  try {
    await db.Cliente.destroy({ where: { id: req.session.cliente.id } });
    res.redirect("/auth");
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para renderizar a página de cadastro
const registerView = function (req, res) {
  // Renderiza a view 'registerView' passando o título da página como parâmetro
  res.render("registerView", { title: "RecicleAqui - Cadastro" });
};

// Função responsável por renderizar a página de cliente
const clienteView = async function (req, res) {
  try {
    const dadosCliente = await db.Cliente.findOne({
      where: { id: req.session.cliente.id },
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
      email: dadosCliente.email,
      telefoneEmpresa: dadosCliente.telefoneEmpresa,
      responsavel: dadosCliente.responsavel,
      telefoneResponsavel: dadosCliente.telefoneResponsavel,
    });
  } catch (error) {
    console.error("Erro ao retornar cliente:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
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
