const Sequelize =  require('sequelize');
const db = require('../db');
const Utilizador = require('./utilizador.model');

const Sso = db.define('S_S_O', {
    ID_SSO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ID_UTILIZADOR: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Utilizador',
            key: 'ID_UTILIZADOR'
        }
    },
    EMAIL_SSO: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    TOKEN: {
        type: Sequelize.STRING(2048),
        allowNull: false
    }
});
Sso.belongsTo(Utilizador, {foreignKey: 'ID_UTILIZADOR'});
module.exports = Sso;