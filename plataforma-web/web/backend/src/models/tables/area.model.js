const Sequelize = require('sequelize');
const db = require('../db.js');
const Categoria = require('../tables/categoria.model.js');

const Area = db.define('AREA', {
  ID_AREA: {
    type: db.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  ID_CATEGORIA: {
    type: db.INTEGER,
    allowNull: false,
    references: {
      model: 'CATEGORIA',
      key: 'ID_CATEGORIA',
    }
  },
  NOME_AREA: {
    type: db.STRING(50),
    allowNull: false,
  },
  DESCRICAO_AR: {
    type:  db.STRING(100),
    allowNull: false,
  }
}, 
{
  timestamps: false,
});

Twofa.belongsTo(Categoria, {foreignKey: 'ID_CATEGORIA'});
module.exports = Area;
