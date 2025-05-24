const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comentario', {
    id_comentario: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id_post'
      }
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    texto_comentario: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    contador_likes_com: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comentario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_comentario",
        unique: true,
        fields: [
          { name: "id_comentario" },
        ]
      },
    ]
  });
};
