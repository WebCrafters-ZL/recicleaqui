const db = require("../db/models");

const adminView = async function (req, res, next) {
    try {
        // Renderiza a view 'adminView' passando os o título da página como parâmetro
        res.render("adminView", { title: "Recicle Aqui - Administração" })
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de erro
    }
}

const usuariosView = async function (req, res, next) {
    try {
        res.render("usuariosView", { title: "Gerenciamento de Usuários" }); // Renderiza a view 'usuariosView'
    } catch (error) {
        next(error);
    }
};

module.exports = {
    adminView,
    usuariosView
}