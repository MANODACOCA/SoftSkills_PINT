const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { conteudos_partilhado, topico} = require('../models/init-models')(sequelize);

async function getForuns(ordenar = "Mais Recentes") {
    let foruns = [];
    let order = [];

    if (ordenar === "Mais Antigos") {
        order = [['data_criacao_cp', 'ASC']];
    } else if (ordenar === "Mais Recentes") {
        order = [['data_criacao_cp', 'DESC']];
    }

    foruns = await conteudos_partilhado.findAll({
        include: [
            {
                model: topico,
                as: "id_topico_topico",
                attributes: ['nome_topico', 'descricao_top'],
            }
        ],
        order
    });

    return foruns;
}

module.exports = {
    getForuns
};