const Sequelize = require('sequelize');
const db = require('../db.js');
const Utilizador = require('./utilizador.model.js');

const Twofa = db.define('2FA', {
  ID_2FA: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  ID_UTILIZADOR: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'UTILIZADOR',
      key: 'ID_UTILIZADOR',
    }
  },
  CODIGO: {
    type: Sequelize.STRING(6),
    allowNull: false,
  },
  DATA_FA: {
    type: Sequelize.DATE,
    allowNull: false,
  }
},
  {
    timestamps: false,
  });

Twofa.belongsTo(Utilizador, { foreignKey: 'ID_UTILIZADOR' });
module.exports = Twofa;
