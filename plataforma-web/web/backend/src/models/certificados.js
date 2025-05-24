const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('certificados', {
    id_certificado: {
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
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    },
    certificado_final: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'certificados',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_certificados",
        unique: true,
        fields: [
          { name: "id_certificado" },
        ]
      },
    ]
  });
};
