const Sequelize = require('sequelize');
const db = require('../db');

const Utilizador = db.define('UTILIZADOR', {
    ID_UTILIZADOR: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NOME_UTILIZADOR: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PASSWORD: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DATA_CRIACAO_UTILIZ: {
        type: Sequelize.DATE,
        allowNull: false
    },
    TELEMOVEL: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    GENERO: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    MORADA: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PAIS: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DATA_NASC: {
        type: Sequelize.DATE,
        allowNull: false
    },
    EMAIL: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DATA_ATIV_UTILI: {
        type: Sequelize.DATE,
        allowNull: false
    },
    AUTEN2FAT: {
        type: Sequelize.BOOLEAN
    }
},
{
    timestamps: false,
});
module.exports = Utilizador;