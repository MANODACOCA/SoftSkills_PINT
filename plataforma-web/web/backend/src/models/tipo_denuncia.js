const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_denuncia', {
    id_tipo_denuncia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_denuncia: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_denuncia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_denuncia_pkey",
        unique: true,
        fields: [
          { name: "id_tipo_denuncia" },
        ]
      },
    ]
  });
};
