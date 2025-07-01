const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likes_comentario', {
    id_likes_comentario: {
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
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    }
  }, {
    sequelize,
    tableName: 'likes_comentario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_likes_comentarios",
        unique: true,
        fields: [
          { name: "id_likes_comentario" },
        ]
      },
    ]
  });
};
