const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_formato', {
    id_formato: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    formato: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_formato',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipo_formato",
        unique: true,
        fields: [
          { name: "id_formato" },
        ]
      },
    ]
  });
};
