const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favoritos', {
    id_favorito: {
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
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    }
  }, {
    sequelize,
    tableName: 'favoritos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_favoritos",
        unique: true,
        fields: [
          { name: "id_favorito" },
        ]
      },
    ]
  });
};
