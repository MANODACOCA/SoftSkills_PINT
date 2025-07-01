const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likes_post', {
    id_likes_post: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    }
  }, {
    sequelize,
    tableName: 'likes_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_likes_post",
        unique: true,
        fields: [
          { name: "id_likes_post" },
        ]
      },
    ]
  });
};
