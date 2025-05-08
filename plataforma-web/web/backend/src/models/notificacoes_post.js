const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacoes_post', {
    id_notificacao_post: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
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
    data_hora_notificacaocp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'notificacoes_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notificacoes_post_pkey",
        unique: true,
        fields: [
          { name: "id_notificacao_post" },
        ]
      },
    ]
  });
};
