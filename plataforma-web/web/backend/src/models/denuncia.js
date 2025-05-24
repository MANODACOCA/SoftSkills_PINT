const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('denuncia', {
    id_denuncia: {
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
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'post',
        key: 'id_post'
      }
    },
    id_tipo_denuncia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_denuncia',
        key: 'id_tipo_denuncia'
      }
    }
  }, {
    sequelize,
    tableName: 'denuncia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_denuncia",
        unique: true,
        fields: [
          { name: "id_denuncia" },
        ]
      },
    ]
  });
};
