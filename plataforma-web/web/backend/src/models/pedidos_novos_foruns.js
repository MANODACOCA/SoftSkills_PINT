const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidos_novos_foruns', {
    id_pedidos_novos_foruns: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_formando: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formandos',
        key: 'id_formando'
      }
    },
    novo_forum: {
      type: DataTypes.STRING(224),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pedidos_novos_foruns',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_pedidos_novos_foruns",
        unique: true,
        fields: [
          { name: "id_pedidos_novos_foruns" },
        ]
      },
    ]
  });
};
