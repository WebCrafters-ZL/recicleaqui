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
                model: db.Usuario
            }
        });
        res.render("clientesView", { title: "Lista de Clientes", clients });
    } catch (error) {
        next(error);
    }
};

const usuariosView = async function (req, res, next) {
    try {
        res.render("usuariosView", { title: "Gerenciamento de Usuários" });
    } catch (error) {
        next(error);
    }
};

const agendamentosView = async function (req, res) {
    try {
        res.render("agendamentosView", { title: "Lista de Agendamentos"});
    } catch (error) {
        console.error('Erro ao renderizar a página de agendamentos:', error);
        res.status(500).send('Erro ao carregar a página de agendamentos');
    }
};

module.exports = {
    adminView,
    usuariosView,
    clientesView,
    agendamentosView
};
