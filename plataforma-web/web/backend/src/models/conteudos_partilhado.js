const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conteudos_partilhado', {
    id_area_conhecimento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'area',
        key: 'id_area'
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
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoria',
        key: 'id_categoria'
      }
    },
    descricao_cp: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    data_criacao_cp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'conteudos_partilhado',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "conteudos_partilhado_pkey",
        unique: true,
        fields: [
          { name: "id_area_conhecimento" },
        ]
      },
    ]
  });
};
