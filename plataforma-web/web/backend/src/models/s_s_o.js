const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s_s_o', {
    id_sso: {
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
    email_sso: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(2048),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 's_s_o',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_s_s_o",
        unique: true,
        fields: [
          { name: "id_sso" },
        ]
      },
    ]
  });
};
