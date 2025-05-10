const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sincrono', {
    id_curso_sincrono: {
      autoIncrement: true,
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
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'utilizador',
        key: 'id_utilizador'
      }
    },
    id_formador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formadores',
        key: 'id_formador'
      }
    },
    id_topico: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_gestor_administrador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome_curso: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    descricao_curso: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    numero_vagas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    data_inicio_curso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_fim_curso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tipo_curso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idioma: {
      type: DataTypes.TEXT,
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
      type: DataTypes.STRING(200),
      allowNull: true
    },
    n_max_form: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sincrono',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sincrono_pkey",
        unique: true,
        fields: [
          { name: "id_curso_sincrono" },
        ]
      },
    ]
  });
};
