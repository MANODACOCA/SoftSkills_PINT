const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    id_post: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    id_conteudos_partilhado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'conteudos_partilhado',
        key: 'id_conteudos_partilhado'
      }
    },
    id_formato: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_formato',
        key: 'id_formato'
      }
    },
    texto_post: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    contador_likes_post: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contador_comentarios: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_criacao_post: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    caminho_ficheiro: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_post",
        unique: true,
        fields: [
          { name: "id_post" },
        ]
      },
    ]
  });
};
