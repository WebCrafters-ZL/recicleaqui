const db = require('../config/db');

const Usuario = db.sequelize.define('Usuario', {
    id_usuario: {
        type: db.Sequelize.INTEGER
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    permissao: {
        type: db.Sequelize.ENUM
    }
});

module.exports = Usuario;