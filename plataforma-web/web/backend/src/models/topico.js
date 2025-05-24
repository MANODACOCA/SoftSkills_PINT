const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('topico', {
    id_topico: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'area',
        key: 'id_area'
      }
    },
    nome_topico: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descricao_top: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'topico',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_topico",
        unique: true,
        fields: [
          { name: "id_topico" },
        ]
      },
    ]
  });
};
