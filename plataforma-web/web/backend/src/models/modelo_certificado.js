const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('modelo_certificado', {
    id_modelo_certificado: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    },
    conteudo_template: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'modelo_certificado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_modelo_certificado",
        unique: true,
        fields: [
          { name: "id_modelo_certificado" },
        ]
      },
    ]
  });
};
