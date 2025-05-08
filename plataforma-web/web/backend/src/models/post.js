const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    id_post: {
      autoIncrement: true,
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
    id_area_conhecimento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'conteudos_partilhado',
        key: 'id_area_conhecimento'
      }
    },
    texto_post: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    contador_likes_post: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contador_comentarios: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "post_pkey",
        unique: true,
        fields: [
          { name: "id_post" },
        ]
      },
    ]
  });
};
