const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cursos', {
    id_curso: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_gestor_administrador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gestor_administrador',
        key: 'id_gestor_administrador'
      }
    },
    id_topico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'topico',
        key: 'id_topico'
      }
    },
    nome_curso: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    descricao_curso: {
      type: DataTypes.STRING(2024),
      allowNull: false
    },
    data_inicio_inscricao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_fim_inscricao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_inicio_curso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_fim_curso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    idioma: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    horas_curso: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    contador_formandos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imagem: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    isassincrono: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    issincrono: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cursos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_cursos_estado_issincrono",
        fields: [
          { name: "estado" },
          { name: "issincrono" },
        ]
      },
      {
        name: "idx_cursos_id_topico",
        fields: [
          { name: "id_topico" },
        ]
      },
      {
        name: "idx_cursos_nome_curso",
        fields: [
          { name: "nome_curso" },
        ]
      },
      {
        name: "pk_cursos",
        unique: true,
        fields: [
          { name: "id_curso" },
        ]
      },
    ]
  });
};
