const Sequelize = require('sequelize');
const db = require('../db');
const Utilizador = require('./utilizador.model');
const Formadores = require('./formadores.model');
const Cursos =  require('./cursos.model');

const Sincrono = db.define('SINCRONO', {
    ID_CURSO_SINCRONO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ID_CURSO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'CURSOS',
            key: 'ID_CURSO'
        }  
    },
    ID_UTILIZADOR: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'UTILIZADOR',
            key: 'ID_UTILIZADOR'
        }
    },
    ID_FORMADOR: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'FORMADORES',
            key: 'ID_FORMADOR'
        }
    },
    ID_TOPICO: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    ID_GESTOR_ADMINISTRADOR: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ID_CATEGORIA: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    ID_AREA: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    NOME_CURSO: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    DESCRICAO_CURSO: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    NUMERO_VAGAS: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    DATA_INICIO_CURSO: {
        type: Sequelize.DATE,
        allowNull: false
    },
    DATA_FIM_CURSO: {
        type: Sequelize.DATE,
        allowNull: false
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
        type: Sequelize.STRING,
        allowNull: false
    },
    HORAS_CURSO: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    CONTADOR_FORMANDOS: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IMAGEM: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    N_MAX_FORM: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
},
{
    timestamps: false,
});
Sincrono.belongsTo(Cursos, {foreignKey: 'ID_CURSO'});
Sincrono.belongsTo(Utilizador, {foreignKey: 'ID_UTILIZADOR'});
Sincrono.belongsTo(Formadores, {foreignKey: 'ID_FORMADOR'});
module.exports = Sincrono;