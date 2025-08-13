const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { categoria, area, topico } = require('../models/init-models')(sequelize);

async function getCategoriaAreaTopico() {
    let categoria_area_topico = [];

    return categoria_area_topico = await categoria.findAll({
        include: [
            {
                model: area,
                as: "areas",
                include: [
                    {
                        model: topico,
                        as: "topicos",
                        attributes: ['id_topico', 'id_area', 'nome_topico', 'descricao_top'],
                    }
                ]
            }
        ]
    })
}


async function getCategoriaAreaTopicoRequired() {
    let categoria_area_topico = [];

    return categoria_area_topico = await categoria.findAll({
        include: [
            {
                model: area,
                as: "areas",
                required: true,
                include: [
                    {
                        model: topico,
                        as: "topicos",
                        required: true,
                        attributes: ['id_topico', 'id_area', 'nome_topico', 'descricao_top'],
                    }
                ]
            }
        ]
    })
}

module.exports = {
    getCategoriaAreaTopico,
    getCategoriaAreaTopicoRequired
};