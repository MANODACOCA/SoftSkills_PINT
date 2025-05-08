const Sequelize = require('sequelize');
const db = require('../db.js');
const Utilizador = require('./utilizador.model.js');
const Post = require('./post.model.js');


const Avaliacoes = db.define('AVALIACAO', {
    ID_AVALIACAO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    ID_POST: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'POST',
            key: 'ID_POST',
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
    AVALIACAO: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

Avaliacoes.belongsTo(Utilizador, { foreignKey: 'ID_UTILIZADOR' });
Avaliacoes.belongsTo(Post, { foreignKey: 'ID_POST' });
module.exports = Avaliacoes;