const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conteudos', {
    id_conteudo: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_aula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'aulas',
        key: 'id_aula'
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
    nome_conteudo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    conteudo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    tempo_duracao: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'conteudos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_conteudo",
        unique: true,
        fields: [
          { name: "id_conteudo" },
        ]
      },
    ]
  });
};
