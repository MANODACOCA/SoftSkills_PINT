const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('formadores', {
    id_formador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
      type: DataTypes.STRING(100),
      allowNull: false
    },
    pais: {
      type: DataTypes.STRING(100),
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
        name: "formadores_pkey",
        unique: true,
        fields: [
          { name: "id_formador" },
          { name: "id_utilizador"},
        ]
      },
    ]
  });
};
