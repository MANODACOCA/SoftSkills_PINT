const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { topico, categoria, conteudos_partilhado, area} = require('../models/init-models')(sequelize);

async function getForumAll () {
    try {
        const forum = conteudos_partilhado.findAll({
            attributes: [
                'id_conteudos_partilhado',
                'id_topico',
                'data_criacao_cp',
            ],
            include: [
                {
                model: topico,
                as: 'id_topico_topico',
                attributes: ['nome_topico'],
                include: [
                    {
                    model: area,
                    as: 'id_area_area',
                    attributes: ['nome_area'],
                    include: [
                        {
                        model: categoria,
                        as: 'id_categoria_categorium',
                        attributes: ['nome_cat'],
                        }
                    ]
                    }
                ]
                },
            ]
        });
        return forum;
    } catch(error) {
        console.error('Erro ao encontrar denuncias', error);
        throw error;
    }
}

module.exports = {
    getForumAll
};