const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gestor_administrador', {
    id_gestor_administrador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    }
  }, {
    sequelize,
    tableName: 'gestor_administrador',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_gestor_administrador",
        unique: true,
        fields: [
          { name: "id_gestor_administrador" },
        ]
      },
    ]
  });
};
