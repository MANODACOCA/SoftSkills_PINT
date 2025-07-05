const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entrega_trabalhos', {
    id_entrega_trabalho: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_trabalho_et: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trabalhos',
        key: 'id_trabalho'
      }
    },
    id_formando_et: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formandos',
        key: 'id_formando'
      }
    },
    caminho_et: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    data_entrega_et: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'entrega_trabalhos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_entrega_trabalhos",
        unique: true,
        fields: [
          { name: "id_entrega_trabalho" },
        ]
      },
    ]
  });
};
