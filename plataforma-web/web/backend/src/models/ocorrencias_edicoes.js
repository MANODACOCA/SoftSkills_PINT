const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ocorrencias_edicoes', {
    nr_ocorrencia: {
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
    }
  }, {
    sequelize,
    tableName: 'ocorrencias_edicoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ocorrencias_edicoes_pkey",
        unique: true,
        fields: [
          { name: "nr_ocorrencia" },
        ]
      },
    ]
  });
};
