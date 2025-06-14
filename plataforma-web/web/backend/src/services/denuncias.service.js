const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');

const { denuncia, comentario, utilizador, post, tipo_denuncia, conteudos_partilhado, topico, area, categoria } = require('../models/init-models')(sequelize);

async function getDenunciasPost() {
    const denunciasPost = await denuncia.findAll({ 
        include: [
        {
        model: utilizador,
        as: 'id_utilizador_utilizador',
        attributes: ['nome_utilizador'], 
        },
        {
        model: post,
        as: 'id_post_post',
        attributes: ['id_post'],    
        include: [
            {
            model: conteudos_partilhado,
            as: 'id_conteudos_partilhado_conteudos_partilhado',
            attributes: ['id_conteudos_partilhado'],
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
                        attributes: ['nome_cat']
                        }
                    ]
                    }
                ]
                }
            ]
            }
        ]
        },
        {
        model: tipo_denuncia,
        as: 'id_tipo_denuncia_tipo_denuncium',
        attributes: ['tipo_denuncia'], 
        }
        ]
     });
     return denunciasPost;
}
async function getDenunciasComentario() {
    const denunciasComComentario = await denuncia.findAll({ 
        include: [
        {
        model: comentario,
        as: 'id_comentario_comentario',
        attributes: ['texto_comentario'],
            include: [
                {
                model: post,
                as: 'id_post_post',
                attributes: ['texto_post'],    
                include: [
                    {
                    model: conteudos_partilhado,
                    as: 'conteudo_comentario',
                    attributes: ['id_conteudo_partilhado'],
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
                                attributes: ['nome_cat']
                                }
                            ]
                            }
                        ]
                        }
                    ]
                    }
                ]
                }
            ]
        },
        {
        model: utilizador,
        as: 'id_utilizador_utilizador',
        attributes: ['nome_utilizador'], 
        },
        {
        model: tipo_denuncia,
        as: 'id_tipo_denuncia_tipo_denuncium',
        attributes: ['tipo_denuncia'], 
        }
        ]
    });
    return denunciasComComentario
}   

async function getDenunciasAll() {
    try {
        const [denunciasPost, denunciasComComentario] = await Promise.all([
        getDenunciasPost(),
        getDenunciasComentario()
        ]);

        const denuncias = [...denunciasPost, ...denunciasComComentario];

        return denuncias;
    } catch(error) {
        console.error('Erro ao encontrar denuncias', error);
        throw error;
    }
}

module.exports = {
    getDenunciasAll
};