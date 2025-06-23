const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trabalhos', {
    id_trabalho: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_curso_tr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    },
    id_formato_tr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_formato',
        key: 'id_formato'
      }
    },
    nome_tr: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    caminho_tr: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    descricao_tr: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'trabalhos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_trabalhos",
        unique: true,
        fields: [
          { name: "id_trabalho" },
        ]
      },
    ]
  });
};
