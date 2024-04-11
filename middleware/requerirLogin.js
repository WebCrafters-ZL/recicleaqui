const requerirLogin = (req, res, next) => {
    if (req.session && req.session.usuario) {
        // Se o usuário estiver autenticado, continua para a próxima rota
        return next();
    } else {
        // Se o usuário não estiver autenticado, redireciona para a página de login
        return res.redirect('/login');
    }
};

module.exports = {
    requerirLogin
}