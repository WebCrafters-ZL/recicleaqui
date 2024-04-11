// Importa o módulo que contém os modelos de banco de dados
const db = require("../db/models");

// Função responsável por renderizar a página de cliente
const clienteView = function (req, res) {
    // Renderiza a view 'clienteView' passando o título da página como parâmetro
    res.render("clienteView", { title: "RecicleAqui - Perfil" });
}

// Exporta a função clienteView para ser utilizada por outros arquivos
module.exports = {
    clienteView
}