const Sequelize = require('sequelize');
const db = require('../db');

const Utilizador = db.define('UTILIZADOR', {
    ID_UTILIZADOR: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    NOME_UTILIZADOR: {
        type: Sequelize.STRING
    },
    PASSWORD: {
        type: Sequelize.STRING
    },
    DATA_CRIACAO_UTILIZ: {
        type: Sequelize.DATE
    },
    TELEMOVEL: {
        type: Sequelize.INTEGER
    },
    GENERO: {
        type: Sequelize.INTEGER
    },
    MORADA: {
        type: Sequelize.STRING
    },
    PAIS: {
        type: Sequelize.STRING
    },
    DATA_NASC: {
        type: Sequelize.DATE
    },
    EMAIL: {
        type: Sequelize.STRING
    },
    DATA_ATIV_UTILI: {
        type: Sequelize.DATE
    },
    AUTEN2FAT: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Utilizador;