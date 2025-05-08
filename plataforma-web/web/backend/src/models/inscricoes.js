const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inscricoes', {
    id_inscricao: {
      autoIncrement: true,
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
    data_limite: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_inicio_insc: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status_inscricao: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'inscricoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "inscricoes_pkey",
        unique: true,
        fields: [
          { name: "id_inscricao" },
        ]
      },
    ]
  });
};
