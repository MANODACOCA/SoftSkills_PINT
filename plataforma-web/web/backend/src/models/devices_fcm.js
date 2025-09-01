const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('devices_fcm', {
    id_devices_fcm: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'devices_fcm',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_devices_fcm",
        unique: true,
        fields: [
          { name: "id_devices_fcm" },
        ]
      },
    ]
  });
};
