const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const Utilizador = sequelize.define('utilizador', {
    id_utilizador: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome_utilizador: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password_util: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    img_perfil: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    data_criacao_utiliz: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    telemovel: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    genero: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    morada: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pais: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    data_nasc: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    data_ativ_utili: {
      type: DataTypes.DATE,
      allowNull: true
    },
    auten2fat: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    estado_utilizador: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isformando: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    isformador: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isgestor_administrador: {
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
        name: "pk_utilizador",
        unique: true,
        fields: [
          { name: "id_utilizador" },
        ]
      },
    ]
  });
    Utilizador.beforeCreate(async (user, options) => {
    const hash = await bcrypt.hash(user.password_util, 10);
    user.password_util = hash;
  });

  return Utilizador;
};