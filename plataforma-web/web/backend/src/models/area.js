const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('area', {
    id_area: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoria',
        key: 'id_categoria'
      }
    },
    nome_area: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descricao_ar: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'area',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "area_pkey",
        unique: true,
        fields: [
          { name: "id_area" },
        ]
      },
    ]
  });
};
