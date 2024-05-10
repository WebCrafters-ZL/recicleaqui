// Middleware para exigir login antes de acessar determinadas rotas
const requerirLogin = (req, res, next) => {
  // Verifica se existe uma sessão e se há um usuário autenticado na sessão
  if (req.session && req.session.usuario) {
    // Se o usuário estiver autenticado, continua para a próxima rota
    return next();
  } else {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    return res.redirect("/auth");
  }
};

// Exporta o middleware para uso em outros arquivos
module.exports = {
  requerirLogin,
};
