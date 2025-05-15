const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('topico', {
    id_topico: {
      autoIncrement: true,
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
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'topico',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "topico_pkey",
        unique: true,
        fields: [
          { name: "id_topico" },
        ]
      },
    ]
  });
};
