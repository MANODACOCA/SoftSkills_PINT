var Sequelize = require('sequelize');
var sequelize = require('../db');

var Categoria = sequelize.define('CATEGORIA', {
    ID_CATEGORIA: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NOME_CATEGORIA: Sequelize.STRING,
    DESCRICAO_CAT: Sequelize.STRING,
},
{
    timestamps: false,
    tableName: 'Categoria'
}
);

module.exports = Categoria;