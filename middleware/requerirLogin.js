// Middleware para exigir login antes de acessar determinadas rotas
const requerirLogin = (req, res, next) => {
  // Verifica se existe uma sessão e se há um usuário autenticado na sessão
  if (req.session && req.session.usuario) {
    // Verifica se o tipo de usuário tem permissão para acessar a rota
    const tipoUsuario = req.session.usuario.tipo;
    const rota = req.originalUrl.split('/')[1]; // Obtém o primeiro segmento da URL como a rota
    switch (tipoUsuario) {
      case "administrador":
        if (rota === "admin") {
          return next(); // Permite acesso para administradores em rotas de admin
        }
        break;
      case "funcionario":
        if (rota === "funcionario") {
          return next(); // Permite acesso para funcionários em rotas de funcionário
        }
        break;
      case "cliente":
        if (rota === "cliente") {
          return next(); // Permite acesso para clientes em rotas de cliente
        }
        break;
      default:
        // Se o tipo de usuário não tiver permissão para acessar a rota, lança um erro
        const error = new Error("Acesso não autorizado para este tipo de usuário.");
        error.statusCode = 403; // Código de status HTTP para acesso proibido
        throw error;
    }
  
  } else {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    return res.redirect("/auth");
  }
};

module.exports = requerirLogin;
