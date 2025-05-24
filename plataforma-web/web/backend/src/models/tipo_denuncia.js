const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_denuncia', {
    id_tipo_denuncia: {
      autoIncrement: true,
      autoIncrementIdentity: true,
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
        name: "pk_tipo_denuncia",
        unique: true,
        fields: [
          { name: "id_tipo_denuncia" },
        ]
      },
    ]
  });
};
