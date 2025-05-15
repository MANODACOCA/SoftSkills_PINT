const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('formadores', {
    id_formador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    especialidades: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    experiencia: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'formadores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_formadores",
        unique: true,
        fields: [
          { name: "id_formador" },
        ]
      },
    ]
  });
};
