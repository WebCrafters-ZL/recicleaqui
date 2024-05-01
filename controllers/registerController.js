// Importa o módulo que contém os modelos de banco de dados
const db = require("../db/models");

// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcryptjs");

// Função assíncrona para cadastrar um usuário e cliente
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

        // Verifica se as senhas coincidem
        if (senha !== confirmarSenha) {
            return res.status(400).json({ error: "As senhas não coincidem." });
        } else {
            // Verifica se o email e/ou o CNPJ já está cadastrado
            const existeUsuario = await db.Usuario.findOne({ where: { email } });
            const existeCliente = await db.Cliente.findOne({ where: { cnpj } });

            if (existeUsuario || existeCliente) {
                // Se os dados já estiverem cadastrados, retorna uma resposta de erro
                return res.status(400).json({ error: "CNPJ e/ou e-mail já cadastrado(s)." });
            } else {
                // Criptografa a senha antes de salvar no banco de dados
                const hashedPassword = await bcrypt.hash(senha, 10);

                // Cria um novo usuário apenas se o email não existir e as senhas conferirem
                const usuario = await db.Usuario.create({
                    email,
                    senha: hashedPassword,
                    permissao: "cliente"
                });

                // Cria um novo cliente associado ao usuário criado anteriormente
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

                // Redireciona para a rota de login após o cadastro bem-sucedido
                return res.redirect("/login");
            }
        }
    } catch (error) {
        // Se ocorrer algum erro durante o processo, loga o erro e retorna uma resposta de erro
        console.error("Erro ao cadastrar usuário e cliente:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

// Função para renderizar a página de cadastro
const registerView = function (req, res) {
    res.render("registerView", { title: "RecicleAqui - Cadastro" });
}

// Exporta as funções para serem utilizadas por outros módulos
module.exports = {
    registerView,
    registerUsuarioCliente
}
