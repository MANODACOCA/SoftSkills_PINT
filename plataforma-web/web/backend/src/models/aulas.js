const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aulas', {
    id_aula: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    },
    data_aula: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nome_aula: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    caminho_url: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    tempo_duracao: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'aulas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_aulas",
        unique: true,
        fields: [
          { name: "id_aula" },
        ]
      },
    ]
  });
};
