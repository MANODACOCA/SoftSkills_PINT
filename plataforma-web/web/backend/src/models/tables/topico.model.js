const Sequelize = require('sequelize');
const db = require('../db');
const Area =  require('./area.model');

const Topico = db.define('TOPICO', {
    ID_TOPICO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    ID_AREA: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'AREA',
            key: 'ID_AREA'
        }
    },
    NOME_TOPICO: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DESCRICAO_TOP: {
        type: Sequelize.STRING,
        allowNull: false
    },
},
{
    timestamps: false,
});
Topico.belongsTo(Area, {foreignKey: 'ID_AREA'});
module.exports = Topico;