const Usuario = require('../models/Usuario');

async function findUserByEmail(email) {
    const [rows] = Usuario.findAll({
        attributes: ['email', 'senha', 'permissao'],
        where: {
            email: email
        }
    });
}