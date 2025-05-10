const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gestor_administrador', {
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    id_gestor_administrador: {
      autoIncrement: true,
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
    tableName: 'gestor_administrador',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "gestor_administrador_pkey",
        unique: true,
        fields: [
          { name: "id_gestor_administrador" },
          { name: "id_utilizador" }
        ]
      },
    ]
  });
};
