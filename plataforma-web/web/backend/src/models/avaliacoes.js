const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avaliacoes', {
    id_avaliacao: {
      autoIncrement: true,
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
    avaliacao: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'avaliacoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "avaliacoes_pkey",
        unique: true,
        fields: [
          { name: "id_avaliacao" },
        ]
      },
    ]
  });
};
