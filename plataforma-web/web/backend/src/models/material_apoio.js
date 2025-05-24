const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('material_apoio', {
    id_material_apoio: {
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
    id_formato: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_formato',
        key: 'id_formato'
      }
    },
    conteudo: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'material_apoio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_material_apoio",
        unique: true,
        fields: [
          { name: "id_material_apoio" },
        ]
      },
    ]
  });
};
