const Sequelize = require('sequelize');
const db = require('../db.js');
const Categoria = require('./categoria.model.js');
const Area = require('./area.model.js');
const Topico = require('./topico.model.js');
const GestorAdmnistrador = require('./gestor_administrador.model.js');
const Utilizador = require('./utilizador.model.js');

const Cursos = db.define('CURSOS', {
    ID_CURSO: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    ID_TOPICO: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'TOPICO',
            key: 'ID_TOPICO',
        }
    },
    ID_UTILIZADOR: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'UTILIZADOR',
            key: 'ID_UTILIZADOR',
        }
    },
    ID_GESTOR_ADMINISTRADOR: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'GESTOR_ADMINISTRADOR',
            key: 'ID_GESTOR_ADMINISTRADOR',
        }
    },
    ID_CATEGORIA: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'CATEGORIA',
            key: 'ID_CATEGORIA',
        }
    },
    ID_AREA: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'AREA',
            key: 'ID_AREA',
        }
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

Cursos.belongsTo(Categoria, { foreignKey: 'ID_CATEGORIA' });
Cursos.belongsTo(Area, { foreignKey: 'ID_AREA' });
Cursos.belongsTo(Topico, { foreignKey: 'ID_TOPICO' });
Cursos.belongsTo(GestorAdmnistrador, { foreignKey: 'ID_GESTOR_ADMINISTRADOR' });
Cursos.belongsTo(Utilizador, { foreignKey: 'ID_UTILIZADOR' });
module.exports = Cursos;