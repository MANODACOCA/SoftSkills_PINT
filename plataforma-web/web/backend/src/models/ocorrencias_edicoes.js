const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ocorrencias_edicoes', {
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    },
    nr_ocorrencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    data_ult_ocorrencia: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ocorrencias_edicoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_ocorrencias_edicoes",
        unique: true,
        fields: [
          { name: "id_curso" },
          { name: "nr_ocorrencia" },
        ]
      },
    ]
  });
};
