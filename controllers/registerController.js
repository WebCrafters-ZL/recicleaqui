const Usuario = require("../db/models/usuario");
const Cliente = require("../db/models/cliente");
const bcrypt = require("bcryptjs");

const registerUser = (req, res) => {
    const { cnpj, razaoSocial, nomeFantasia, cep, logradouro,
        numero, complemento, bairro, cidade, estado, email,
        telefoneEmpresa, nomeResponsavel, telefoneResponsavel,
        senha, confirmarSenha } = req.body;
    if (!cnpj || !razaoSocial || !nomeFantasia || !cep || !logradouro ||
        !numero || !bairro || !cidade || !estado || !email ||
        !telefoneEmpresa, !nomeResponsavel,
        !senha || !confirmarSenha) {
        console.log("Preencher o(s) campo(s) vazio(s)");
    }

    if (senha != confirmarSenha) {
        console.log("As senhas precisam ser idênticas");
    } else {
        Usuario.findAll({
            where: {
                email: email
            }
        }).then((usuario) => {
            if (usuario) {
                console.log("E-mail já cadastrado");
                res.render("register", {
                    cnpj, razaoSocial, nomeFantasia, cep, logradouro,
                    numero, complemento, bairro, cidade, estado, email,
                    telefoneEmpresa, nomeResponsavel, telefoneResponsavel,
                    senha, confirmarSenha
                });
            } else {
                const novoUsuario = new Usuario({
                    email: email,
                    senha: senha,
                    cliente: "cliente",
                });

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(novoUsuario.senha, salt, (err, hash) => {
                        if (err) throw err;
                        novoUsuario.senha = hash;
                        novoUsuario
                            .save()
                            .then(res.redirect("/login"))
                            .catch((err) => console.log(err));
                    })
                );

                const novoCliente = new Cliente({
                    cnpj, razaoSocial, nomeFantasia, cep, logradouro,
                    numero, complemento, bairro, cidade, estado,
                    telefoneEmpresa, nomeResponsavel, telefoneResponsavel
                })
            }
        });
    }
}


const registerView = (req, res) => {
    res.render("registerView", { title: "RecicleAqui - Cadastro" });
}

module.exports = {
    registerView,
    registerUser
}