const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conteudos_forum', {
    id_conteudos_forum: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_comentario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'comentario',
        key: 'id_comentario'
      }
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'post',
        key: 'id_post'
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
    tableName: 'conteudos_forum',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_conteudos_forum",
        unique: true,
        fields: [
          { name: "id_conteudos_forum" },
        ]
      },
    ]
  });
};
