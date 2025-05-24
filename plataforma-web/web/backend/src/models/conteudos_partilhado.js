const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conteudos_partilhado', {
    id_conteudos_partilhado: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_topico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'topico',
        key: 'id_topico'
      }
    },
    data_criacao_cp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'conteudos_partilhado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_conteudos_partilhado",
        unique: true,
        fields: [
          { name: "id_conteudos_partilhado" },
        ]
      },
    ]
  });
};
