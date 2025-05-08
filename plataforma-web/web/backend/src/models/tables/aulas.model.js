const Sequelize = require('sequelize');
const db = require('../db.js');
const Cursos = require('./cursos.model.js');

const Aulas = db.define('AULAS', {
    ID_AULA: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    ID_CURSO: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'CURSOS',
            key: 'ID_TOPICO',
        }
    },
    DATA_AULA: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    NOME_AULA: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

Aulas.belongsTo(Cursos, { foreignKey: 'ID_CURSO' });
module.exports = Aulas;