const Sequelize = require('sequelize');
const db = require('../db.js');
const Cursos = require('./cursos.model.js');

const Assincrono = db.define('ASSINCRONO', {
    ID_CURSO_ASSINCRONO: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    ID_CURSO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'CURSOS',
            key: 'ID_CURSO',
        }
    },
    ID_TOPICO: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    ID_GESTOR_ADMINISTRADOR: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    ID_CATEGORIA: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    ID_AREA: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    NOME_CURSO: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    DESCRICAO_CURSO: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    NUMERO_VAGAS: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    DATA_INICIO_CURSO: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    DATA_FIM_CURSO: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    TIPO_CURSO: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    ESTADO: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    IDIOMA: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    HORAS_CURSO: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    CONTADOR_FORMANDOS: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    IMAGEM: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
},
    {
        timestamps: false,
    });

Assincrono.belongsTo(Cursos, { foreignKey: 'ID_CURSO' });
module.exports = Assincrono;