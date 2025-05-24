const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inscricoes', {
    id_inscricao: {
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
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    },
    data_inscricao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    status_inscricao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'inscricoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_inscricoes",
        unique: true,
        fields: [
          { name: "id_inscricao" },
        ]
      },
    ]
  });
};
