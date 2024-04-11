// Função responsável por renderizar a página de login
const loginView = (req, res) => {
    res.render("loginView", { title: "RecicleAqui - Login" }); // Renderiza a view 'loginView' passando o título da página como parâmetro
}

// Exporta a função 'loginView' para ser utilizada por outros arquivos
module.exports = {
    loginView
}
