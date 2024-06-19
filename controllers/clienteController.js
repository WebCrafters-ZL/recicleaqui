// Importa o modelo de Cliente e Usuario
const db = require("../db/models");

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
      const existeUsuario = await db.Usuario.findOne({ where: { email } });
      const existeCliente = await db.Cliente.findOne({ where: { cnpj } });

      if (existeUsuario || existeCliente) {
        // Se os dados já estiverem cadastrados, retorna uma resposta de erro
        const error = new Error("CNPJ e/ou e-mail já cadastrado(s).");
        error.statusCode = 400;
        throw error; // Lança o erro para o próximo middleware de erro
      } else {
        // Criptografa a senha antes de salvar no banco de dados
        const hashSenha = await bcrypt.hash(senha, 10);

        // Cria um novo usuário
        const usuario = await db.Usuario.create({
          email,
          senha: hashSenha,
          tipo: 'cliente',
        });

        // Cria um novo cliente, referenciando o usuário criado
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
        const hashSenha = await bcrypt.hash(senha, 10);

        await db.Usuario.update({
          email,
          senha: hashSenha,
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
    await db.Cliente.destroy({ where: { usuario_id: req.session.usuario.id } });
    await db.Usuario.destroy({ where: { id: req.session.usuario.id } })
    res.redirect("/auth/logout");
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

const cadastroClienteView = function (req, res) {
  // Renderiza a view 'cadastroClienteView' passando o título da página como parâmetro
  res.render("cadastroClienteView", { title: "RecicleAqui - Cadastro de Cliente", script: "clienteView" });
};

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
      script: "clienteView"
    });
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};
const clienteCadastrarColeta = async function (req, res, next) {
  try {
    const { data, hora, observacao } = req.body;
    const dadosCliente = await db.Cliente.findOne({
      where: { usuario_id: req.session.usuario.id },
    });

    const coletaExistente = await db.Coleta.findOne({
      where: {
        data: data,
        hora: hora,
        status: ['pendente', 'aceito']
      }
    });

    if (coletaExistente) {
      const error = new Error("Já existe uma coleta para a mesma data e hora");
      error.statusCode = 400;
      throw error;
    } else {
      await db.Coleta.create({
        data: data,
        hora: hora,
        status: 'pendente',
        observacao: observacao,
        cliente_id: dadosCliente.id
      });

      res.send(`
              <script>
                  alert('Coleta agendada com sucesso.');
                  setTimeout(function() {
                      window.location.href = "/cliente";
                  }, 3000);
              </script>
          `);
    }

  } catch (error) {
    next(error);
  }
}

const clienteCadastrarColetaView = async function (req, res, next) {
  // Renderiza a view 'cadastroClienteView' passando o título da página como parâmetro
  res.render("clienteCadastrarColetaView", { title: "RecicleAqui - Agendamento de coleta", script: "clienteCadastrarColetaView" });
}



const historicoView = async function (req, res, next) {
  try {
    // Buscar os dados do cliente com base no ID do usuário logado
    const dadosCliente = await db.Cliente.findOne({
      where: { usuario_id: req.session.usuario.id },
    });

    // Buscar as coletas do cliente
    const coleta = await db.Coleta.findAll({
      where: { cliente_id: dadosCliente.id },
      order: [['data', 'DESC'], ['hora', 'DESC']] // Ordenar por data e hora
    });

    // Renderizar a view 'historicoView' passando os agendamentos como parâmetro
    res.render("historicoView", {
      title: "RecicleAqui - Histórico de agendamento de coleta",
      script: "historicoView",
      coleta
    });
  } catch (error) {
    next(error); // Passar o erro para o próximo middleware de erro
  }
};

const clienteCancelarColeta = async function (req, res, next) {
  try {
      // Extrair o ID da coleta do corpo da requisição
      const { coletaId } = req.body;

      // Atualiza o status da coleta para 'cancelado'
      await db.Coleta.update({
          status: 'cancelado'
      }, { where: { id: coletaId } });

      // Redireciona ou envia uma resposta de sucesso
      return res.status(200).json({ message: 'Coleta cancelada com sucesso.' });
  } catch (error) {
      next(error); // Passa o erro para o próximo middleware de erro
  }
};

const exibirColetasCanceladasRejeitadas = async function (req, res, next) {
  try {
      // Busque as coletas com status cancelado ou rejeitado no banco de dados
      const coletasCanceladasRejeitadas = await Coleta.findAll({
          where: {
              status: ['cancelado', 'rejeitado']
          }
      });

      res.render('coletasCanceladasRejeitadas', { coletas: coletasCanceladasRejeitadas });
  } catch (error) {
      // Tratar erros
      next(error);
  }
};



module.exports = {
  cadastrarCliente,
  atualizarCliente,
  excluirCliente,
  cadastroClienteView,
  clienteView,
  clienteCadastrarColetaView,
  clienteCadastrarColeta,
  historicoView,
  clienteCancelarColeta,
  exibirColetasCanceladasRejeitadas
};


