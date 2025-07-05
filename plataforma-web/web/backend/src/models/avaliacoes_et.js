const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avaliacoes_et', {
    'id_avaliaÇÕes_aet': {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_entrega_trabalho_aet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'entrega_trabalhos',
        key: 'id_entrega_trabalho'
      }
    },
    avaliacao: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'avaliacoes_et',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_avaliaoes_aet",
        unique: true,
        fields: [
          { name: "id_avaliaÇÕes_aet" },
        ]
      },
    ]
  });
};
