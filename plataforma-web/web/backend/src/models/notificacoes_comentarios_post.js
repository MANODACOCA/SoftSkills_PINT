const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacoes_comentarios_post', {
    id_notificacao_comentarios_post: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_comentario: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    data_hora_notificacaocp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'notificacoes_comentarios_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_notificacoes_comentarios_post",
        unique: true,
        fields: [
          { name: "id_notificacao_comentarios_post" },
        ]
      },
    ]
  });
};
