const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conteudos', {
    id_conteudo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_aula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'aulas',
        key: 'id_aula'
      }
    },
    id_formato: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_formato',
        key: 'id_formato'
      }
    },
    conteudo: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'conteudos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "conteudos_pkey",
        unique: true,
        fields: [
          { name: "id_conteudo" },
        ]
      },
    ]
  });
};
