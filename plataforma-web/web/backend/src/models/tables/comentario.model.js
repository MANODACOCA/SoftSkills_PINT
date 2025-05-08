const Sequelize = require('sequelize');
const db = require('../db.js');
const Post = require('./post.model.js');
const Utilizador = require('./utilizador.model.js');
const Avaliacoes = require('./avaliacoes.model.js');

const Comentario = db.define('COMENTARIO', {
    ID_COMENTARIO: {
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
    ID_AVALIACAO: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'AVALIACAO',
            key: 'ID_AVALIACAO',
        }
    },
    TEXTO_COMENTARIO: {
        type: Sequelize.STRING(500),
        allowNull: false,
    },
    CONTADOR_LIKES_COM: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

Comentario.belongsTo(Utilizador, { foreignKey: 'ID_UTILIZADOR' });
Comentario.belongsTo(Post, { foreignKey: 'ID_POST' });
Comentario.belongsTo(Avaliacoes, { foreignKey: 'ID_AVALIACAO' });
module.exports = Comentario;