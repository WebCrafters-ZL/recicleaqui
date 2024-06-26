const db = require("../db/models");

const adminView = async function (req, res, next) {
    try {
        // Renderiza a view 'adminView' passando o título da página como parâmetro
        res.render("adminView", { title: "Recicle Aqui - Administração" });
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de erro
    }
}

const clientesView = async function (req, res, next) {
    try {
        const clients = await db.Cliente.findAll({
            include: {
                model: db.Usuario // Incluindo o modelo Usuario para acessar os dados do usuário associado a cada cliente
            }
        });

        // Mapeando os dados para adicionar o email do usuário a cada cliente
        const clientsWithUserEmail = clients.map(client => ({
            id: client.id,
            cnpj: client.cnpj,
            razaoSocial: client.razaoSocial,
            nomeFantasia: client.nomeFantasia,
            emailUsuario: client.Usuario.email,
            responsavel: client.responsavel
        }));
        res.render("usuariosView", { title: "RecicleAqui - Gerenciamento de Clientes", clients: clientsWithUserEmail });
    } catch (error) {
        next(error);
    }
};

const adminDeletarCliente = async (req, res, next) => {
    try {

        //Buscar o cliente no banco de dados
        const cliente = await db.Cliente.findByPk(req.params.id, {
        });

        // Verificar se o cliente foi encontrado
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        // Excluir o usuário associado ao cliente
        await db.Usuario.destroy({ where: { id: cliente.usuario_id } });

        //Retornar uma resposta de sucesso
        res.send(`
   <script>
    alert('Cliente deletado com sucesso.');
   setTimeout(function() {
    window.location.href= "/admin/usuarios";
    }, 2000);
    </script>
   `);
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de erro
    }
};


const agendamentosView = async function (req, res) {
    try {
        // Buscar as coletas do cliente
        const pendentes = await db.Coleta.findAll({
            where: { status: 'pendente' },
            order: [['data', 'ASC'], ['hora', 'ASC']],
            include: {
                model: db.Cliente
            }
        });

        const aceitas = await db.Coleta.findAll({
            where: { status: 'aceito' },
            order: [['data', 'ASC'], ['hora', 'ASC']],
            include: {
                model: db.Cliente
            }
        });

        const inativas = await db.Coleta.findAll({
            where: { status: ['rejeitado', 'cancelado'], },
            order: [['data', 'ASC'], ['hora', 'ASC']],
            include: {
                model: db.Cliente
            }
        });

        const concluidas = await db.Coleta.findAll({
            where: { status: 'concluido' },
            order: [['data', 'ASC'], ['hora', 'ASC']],
            include: {
                model: db.Cliente
            }
        });

        const todas = await db.Coleta.findAll({
            order: [['data', 'ASC'], ['hora', 'ASC']],
            include: {
                model: db.Cliente
            }
        });

        const coletasPendentes = pendentes.map(coleta => ({
            id: coleta.id,
            cnpj: coleta.Cliente.cnpj,
            nomeFantasia: coleta.Cliente.nomeFantasia,
            data: coleta.data,
            hora: coleta.hora,
            observacao: coleta.observacao
        }));

        const coletasAceitas = aceitas.map(coleta => ({
            id: coleta.id,
            cnpj: coleta.Cliente.cnpj,
            nomeFantasia: coleta.Cliente.nomeFantasia,
            data: coleta.data,
            hora: coleta.hora,
            observacao: coleta.observacao
        }));

        const coletasInativas = inativas.map(coleta => ({
            id: coleta.id,
            cnpj: coleta.Cliente.cnpj,
            nomeFantasia: coleta.Cliente.nomeFantasia,
            data: coleta.data,
            hora: coleta.hora,
            status: coleta.status,
            observacao: coleta.observacao
        }));

        const coletasConcluidas = concluidas.map(coleta => ({
            id: coleta.id,
            cnpj: coleta.Cliente.cnpj,
            nomeFantasia: coleta.Cliente.nomeFantasia,
            data: coleta.data,
            hora: coleta.hora,
            observacao: coleta.observacao,
            avaliacao: coleta.avaliacao
        }));

        const coletas = todas.map(coleta => ({
            id: coleta.id,
            cnpj: coleta.Cliente.cnpj,
            nomeFantasia: coleta.Cliente.nomeFantasia,
            data: coleta.data,
            hora: coleta.hora,
            status: coleta.status,
            observacao: coleta.observacao,
            avaliacao: coleta.avaliacao
        }));

        res.render("agendamentosView", {
            title: "RecicleAqui - Gerenciamento de Agendamentos",
            coletaPendente: coletasPendentes,
            coletaAceita: coletasAceitas,
            coletaInativa: coletasInativas,
            coletaConcluida: coletasConcluidas,
            coleta: coletas,
        });
    } catch (error) {
        next(error)
    }
};

const aceitarColeta = async function (req, res, next) {
    try {

        // Atualiza o status da coleta para 'cancelado'
        await db.Coleta.update({
            status: 'aceito'
        }, { where: { id: req.params.id } });

        res.send(`
        <script>
            alert('Coleta confirmada com sucesso.');
            setTimeout(function() {
                window.location.href = "/admin/agendamentos";
            }, 2000);
        </script>
    `);

    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de erro
    }
};

const rejeitarColeta = async function (req, res, next) {
    try {

        // Atualiza o status da coleta para 'cancelado'
        await db.Coleta.update({
            status: 'rejeitado'
        }, { where: { id: req.params.id } });

        res.send(`
        <script>
            alert('Coleta rejeitada com sucesso.');
            setTimeout(function() {
                window.location.href = "/admin/agendamentos";
            }, 2000);
        </script>
    `);

    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de erro
    }
};

const concluirColeta = async function (req, res, next) {
    try {

        // Atualiza o status da coleta para 'cancelado'
        await db.Coleta.update({
            status: 'concluido'
        }, { where: { id: req.params.id } });

        res.send(`
        <script>
            alert('Coleta concluida com sucesso.');
            setTimeout(function() {
                window.location.href = "/admin/agendamentos";
            }, 2000);
        </script>
    `);

    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de erro
    }
};


module.exports = {
    adminView,
    clientesView,
    agendamentosView,
    adminDeletarCliente,
    aceitarColeta,
    rejeitarColeta,
    concluirColeta,
};
