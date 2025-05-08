const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizador', {
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    }
  }, {
    sequelize,
    tableName: 'utilizador',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "utilizador_pkey",
        unique: true,
        fields: [
          { name: "id_utilizador" },
        ]
      },
    ]
  });
};
