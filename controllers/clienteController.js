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

        res.send(`
          <script>
              alert('Cadastro efetuado com sucesso.');
              setTimeout(function() {
                  window.location.href = "/auth";
              }, 2000);
          </script>
      `);
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

        res.send(`
          <script>
              alert('Cadastro atualizado com sucesso.');
              setTimeout(function() {
                  window.location.href = "/cliente";
              }, 2000);
          </script>
      `);
      }
    }
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

const excluirCliente = async function (req, res, next) {
  try {
    await db.Usuario.destroy({ where: { id: req.session.usuario.id } })
    res.send(`
      <script>
          alert('Cadastro excluído com sucesso.');
          setTimeout(function() {
              window.location.href = "/auth/logout";
          }, 2000);
      </script>
  `);
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
      title: "RecicleAqui - Perfil de Usuário",
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
                  }, 2000);
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
    const coletasPendentes = await db.Coleta.findAll({
      where: { status: 'pendente', cliente_id: dadosCliente.id },
      order: [['data', 'ASC'], ['hora', 'ASC']], // Ordenar por data e hora
    });

    const coletasAceitas = await db.Coleta.findAll({
      where: { status: 'aceito', cliente_id: dadosCliente.id },
      order: [['data', 'ASC'], ['hora', 'ASC']], // Ordenar por data e hora
    });

    const coletasInativas = await db.Coleta.findAll({
      where: { status: ['rejeitado', 'cancelado'], cliente_id: dadosCliente.id },
      order: [['data', 'ASC'], ['hora', 'ASC']], // Ordenar por data e hora
    })

    const coletasConcluidas = await db.Coleta.findAll({
      where: { status: 'concluido', cliente_id: dadosCliente.id },
      order: [['data', 'ASC'], ['hora', 'ASC']], // Ordenar por data e hora
    });

    // Renderizar a view 'historicoView' passando as coletas como parâmetro
    res.render("historicoView", {
      title: "RecicleAqui - Histórico de  coletas",
      script: "historicoView",
      coletaPendente: coletasPendentes,
      coletaAceita: coletasAceitas,
      coletaInativa: coletasInativas,
      coletaConcluida: coletasConcluidas,
    });
  } catch (error) {
    next(error); // Passar o erro para o próximo middleware de erro
  }
};

const clienteCancelarColeta = async function (req, res, next) {
  try {

    // Atualiza o status da coleta para 'cancelado'
    await db.Coleta.update({
      status: 'cancelado'
    }, { where: { id: req.params.id } });

    res.send(`
      <script>
          alert('Coleta cancelada com sucesso.');
          setTimeout(function() {
              window.location.href = "/cliente/historico-coleta";
          }, 2000);
      </script>
  `);

  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
  }
};

const clienteAvaliarColeta = async function (req, res, next) {
  try {
    const { coletaId, avaliacao } = req.body;
    // Atualiza o status da coleta para 'cancelado'
    await db.Coleta.update({
      avaliacao: avaliacao
    }, { where: { id: coletaId } });

    res.send(`
      <script>
          alert('Coleta avaliada com sucesso.');
          setTimeout(function() {
              window.location.href = "/cliente/historico-coleta";
          }, 2000);
      </script>
  `);

  } catch (error) {
    next(error); // Passa o erro para o próximo middleware de erro
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
  clienteAvaliarColeta
};
