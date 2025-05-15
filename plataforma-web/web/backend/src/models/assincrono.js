const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assincrono', {
    id_curso_assincrono: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    }
  }, {
    sequelize,
    tableName: 'assincrono',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_assincrono",
        unique: true,
        fields: [
          { name: "id_curso_assincrono" },
        ]
      },
    ]
  });
};
