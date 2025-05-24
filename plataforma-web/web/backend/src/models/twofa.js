const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('twofa', {
    id_2fa: {
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
    codigo: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    data_fa: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'twofa',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_2fa",
        unique: true,
        fields: [
          { name: "id_2fa" },
        ]
      },
    ]
  });
};
