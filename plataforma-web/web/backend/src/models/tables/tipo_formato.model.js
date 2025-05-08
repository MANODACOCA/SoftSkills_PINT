const Sequelize = require('sequelize');
const db = require('../db');

const TipoFormato = db.define('TIPO_FORMATO', {
    ID_FORMATO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    FORMATO: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
},
{
    timestamps: false,
});
module.exports = TipoFormato;