// Importação dos módulos necessários
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Usuario'); // Importação do modelo de usuário
const { eAdmin } = require('.middleware/auth'); // Importação do middleware de autenticação

// Inicialização do aplicativo Express
const app = express();

// Middleware do Express para analisar o corpo das requisições com formato JSON
app.use(express.json());

// Rota para listar usuários (exemplo de autenticação de administrador)
app.get('/', eAdmin, async (req, res) => {
    return res.json({
        erro: false,
        mensagem: "Listar usuários",
        id_usuario_logado: req.userId
    });
});

// Rota para cadastrar um usuário
app.post('/cadastrar', async (req, res) => {
    // Hash da senha usando bcrypt (exemplo)
    const password = await bcrypt.hash(req.body.password, 8);

    console.log(password); // Apenas para exemplo
});

// Rota para login de usuário
app.post('/login', async (req, res) => {
    // Validação do login (exemplo, requer ajustes)
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou senha incorretos!"
        });
    }

    // Verificação da senha usando bcrypt (exemplo)
    const isValidPassword = await bcrypt.compare(req.body.password, "senha_hash_do_banco_de_dados");
    if (!isValidPassword) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou senha incorretos!"
        });
    }

    // Geração do token de autenticação usando jsonwebtoken (exemplo)
    const token = jwt.sign({ id: 1 }, "segredo_do_token", {
        expiresIn: '7d' // Token válido por 7 dias
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});

// Rota de exemplo para listar usuários (exemplo de uso de middleware)
app.get('/usuarios', eAdmin, async (req, res) => {
    // Implementação da lógica para listar usuários
});

// Exportação do aplicativo Express para uso em outros arquivos
module.exports = app;
