const db = require("../db/models");
const bcrypt = require("bcryptjs");

const registerUsuarioCliente = async function (req, res) {
    try {
        // Extrair os dados do corpo da requisição
        const {
            cnpj,
            razaoSocial,
            nomeFantasia,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            email,
            telefoneEmpresa,
            responsavel,
            telefoneResponsavel,
            senha,
            confirmarSenha
        } = req.body;

        // Verificar se o email já está cadastrado
        const existeUsuario = await db.Usuario.findOne({ where: { email } });
        if (existeUsuario) {
            return res.status(400).json({ error: "O email já está cadastrado." });
        } else {
            // Verificar se a senha é igual à confirmarSenha
            if (senha !== confirmarSenha) {
                return res.status(400).json({ error: "As senhas não conferem." });
            } else {
                // Criptografar a senha antes de salvar no banco de dados
                const hashedPassword = await bcrypt.hash(senha, 10);

                // Criar um novo usuário apenas se o email não existir e as senhas conferirem
                const usuario = await db.Usuario.create({
                    email,
                    senha: hashedPassword,
                    permissao: "cliente"
                });

                // Criar um novo cliente associado ao usuário criado anteriormente
                await db.Cliente.create({
                    usuario_id: usuario.id,
                    cnpj,
                    razaoSocial,
                    nomeFantasia,
                    cep,
                    logradouro,
                    numero,
                    complemento,
                    bairro,
                    cidade,
                    estado,
                    telefoneEmpresa,
                    responsavel,
                    telefoneResponsavel
                });

                // Redirecionar para a rota de login após o cadastro bem-sucedido
                return res.redirect("/login");
            }
        }
    } catch (error) {
        console.error("Erro ao cadastrar usuário e cliente:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

const registerView = function (req, res) {
    res.render("registerView", { title: "RecicleAqui - Cadastro" });
}

module.exports = {
    registerView,
    registerUsuarioCliente
}
