const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cursos', {
    id_curso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_topico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'topico',
        key: 'id_topico'
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
    id_gestor_administrador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gestor_administrador',
        key: 'id_gestor_administrador'
      }
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoria',
        key: 'id_categoria'
      }
    },
    id_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'area',
        key: 'id_area'
      }
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
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cursos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cursos_pkey",
        unique: true,
        fields: [
          { name: "id_curso" },
        ]
      },
    ]
  });
};
