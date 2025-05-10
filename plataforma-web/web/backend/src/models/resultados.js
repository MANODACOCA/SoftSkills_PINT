const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resultados', {
    id_resul: {
      autoIncrement: true,
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
    id_curso_sincrono: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sincrono',
        key: 'id_curso_sincrono'
      }
    },
    resul: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'resultados',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "resultados_pkey",
        unique: true,
        fields: [
          { name: "id_resul" },
        ]
      },
    ]
  });
};
