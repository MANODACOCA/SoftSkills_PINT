const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidos_upgrade_cargo', {
    id_pedidos_upgrade_cargo: {
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
    }
  }, {
    sequelize,
    tableName: 'pedidos_upgrade_cargo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_pedidos_upgrade_cargo",
        unique: true,
        fields: [
          { name: "id_pedidos_upgrade_cargo" },
        ]
      },
    ]
  });
};
