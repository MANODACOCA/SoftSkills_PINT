const Sequelize = require('sequelize');
const db = require('../db.js');

const Categoria = db.define('CATEGORIA', {
    ID_CATEGORIA: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    NOME_CATEGORIA: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    DESCRICAO_CAT: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
},
    {
        timestamps: false,
    });

module.exports = Categoria;