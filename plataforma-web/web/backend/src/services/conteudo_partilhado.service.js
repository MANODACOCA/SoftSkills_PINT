const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { conteudos_partilhado, topico } = require('../models/init-models')(sequelize);

async function getForuns(ordenar = "Mais Recentes", search = "") {
  let foruns = [];
  let order = [];
  let whereTopico = {};

  if (ordenar === "Mais Antigos") {
    order = [['data_criacao_cp', 'ASC']];
  } else if (ordenar === "Mais Recentes") {
    order = [['data_criacao_cp', 'DESC']];
  }

  if (search) {

    const unaccentedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const searchFilter = Sequelize.where(
      Sequelize.fn('unaccent', Sequelize.col('id_topico_topico.nome_topico')),
      {
        [Op.iLike]: `%${unaccentedSearch}%`
      }
    );

   whereTopico = searchFilter;
  }

  foruns = await conteudos_partilhado.findAll({
    include: [
      {
        model: topico,
        as: "id_topico_topico",
        attributes: ['nome_topico', 'descricao_top'],
        where: Object.keys(whereTopico).length ? whereTopico : undefined
      }
    ],
    order
  });

  return foruns;
}

module.exports = {
  getForuns
};