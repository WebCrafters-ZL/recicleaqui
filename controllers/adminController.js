const db = require("../db/models");

const adminView = async function (req, res, next) {
    try {
        // Renderiza a view 'adminView' passando os o título da página como parâmetro
        res.render("adminView", { title: "Recicle Aqui - Administração" })
    } catch (error) {
        next(error); // Passa o erro para o próximo middleware de erro
    }
}

module.exports = {
    adminView
}