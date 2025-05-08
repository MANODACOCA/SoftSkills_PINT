const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('formandos', {
    id_formando: {
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
    nome_utilizador: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    password_util: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    data_criacao_utiliz: {
      type: DataTypes.DATE,
      allowNull: false
    },
    telemovel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    genero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    morada: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pais: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data_nasc: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    data_ativ_utili: {
      type: DataTypes.DATE,
      allowNull: true
    },
    auten2fat: {
      type: DataTypes.BOOLEAN,
      allowNull: true
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
        name: "formandos_pkey",
        unique: true,
        fields: [
          { name: "id_formando" },
        ]
      },
    ]
  });
};
