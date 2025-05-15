const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('formandos', {
    id_formando: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    percurso_formativo: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formandos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_formandos",
        unique: true,
        fields: [
          { name: "id_formando" },
        ]
      },
    ]
  });
};
