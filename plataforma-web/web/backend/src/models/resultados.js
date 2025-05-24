const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resultados', {
    id_resul: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_formando: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formandos',
        key: 'id_formando'
      }
    },
    id_curso_sincrono: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sincrono',
        key: 'id_curso_sincrono'
      }
    },
    resul: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'resultados',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_resultados",
        unique: true,
        fields: [
          { name: "id_resul" },
        ]
      },
    ]
  });
};
