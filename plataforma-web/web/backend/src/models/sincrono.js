const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sincrono', {
    id_curso_sincrono: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    },
    id_formador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formadores',
        key: 'id_formador'
      }
    }
  }, {
    sequelize,
    tableName: 'sincrono',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_sincrono",
        unique: true,
        fields: [
          { name: "id_curso_sincrono" },
        ]
      },
    ]
  });
};
