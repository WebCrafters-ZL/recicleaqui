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
        res.render("usuariosView", { title: "Lista de Clientes", clients: clientsWithUserEmail });
    } catch (error) {
        next(error);
    }
};

const adminDeletarCliente = async (req, res , next) => {
    try {
     
   //Buscar o cliente no banco de dados
    const cliente = await db.Cliente.findByPk(req.params.id,{
    });
    
    // Verificar se o cliente foi encontrado
    if (!cliente) {
    return res.status(404).json({message:'Cliente não encontrado' });
    }
   
    // Excluir o usuário associado ao cliente
    await db.Usuario.destroy({where: { id: cliente.usuario_id}});
   
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
            order: [['data', 'DESC'], ['hora', 'DESC']],
            include: {
                model: db.Cliente
            }
        });

        const aceitas = await db.Coleta.findAll({
            where: { status: 'aceito' },
            order: [['data', 'DESC'], ['hora', 'DESC']],
            include: {
                model: db.Cliente
            }
        });

        const inativas = await db.Coleta.findAll({
            where: { status: ['rejeitado', 'cancelado'], },
            order: [['data', 'DESC'], ['hora', 'DESC']],
            include: {
                model: db.Cliente
            }
        });

        const concluidas = await db.Coleta.findAll({
            where: { status: 'concluido' },
            order: [['data', 'DESC'], ['hora', 'DESC']],
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
            observacao: coleta.observacao
        }));

        res.render("agendamentosView", {
            title: "Lista de Agendamentos",
            coletaPendente: coletasPendentes,
            coletaAceita: coletasAceitas,
            coletaInativa: coletasInativas,
            coletaConcluida: coletasConcluidas
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    adminView,
    clientesView,
    agendamentosView,
    adminDeletarCliente
};
