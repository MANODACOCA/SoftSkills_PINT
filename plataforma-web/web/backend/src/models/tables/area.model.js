const Sequelize = require('sequelize');
const db = require('../db.js');
const Categoria = require('../tables/categoria.model.js');

const Area = db.define('AREA', {
  ID_AREA: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  ID_CATEGORIA: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'CATEGORIA',
      key: 'ID_CATEGORIA',
    }
  },
  NOME_AREA: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  DESCRICAO_AR: {
    type: Sequelize.STRING(100),
    allowNull: true,
  }
},
  {
    timestamps: false,
  });

Area.belongsTo(Categoria, { foreignKey: 'ID_CATEGORIA' });
module.exports = Area;
