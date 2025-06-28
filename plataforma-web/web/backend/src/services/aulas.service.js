
const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { aulas, material_apoio, conteudos, tipo_formato, cursos, trabalhos, formadores, sincrono, utilizador } = require('../models/init-models')(sequelize);

//Vamos aos cursos inscritos para ir para a pagina de curso com aula ->  
async function getAulasAndMateriaApoioForCurso(cursoId) {
    try {
        const dadosCurso = await cursos.findOne({
            where: { id_curso: cursoId },
            include: [
                {
                    model: sincrono,
                    as: 'sincrono',
                    include: [
                        {
                            model: formadores,
                            as: 'id_formador_formadore',
                            include: [
                                {
                                    model: utilizador,
                                    as: 'id_formador_utilizador',
                                    attributes: [
                                        [sequelize.col('id_utilizador'), 'id_util'],
                                        [sequelize.col('nome_utilizador'), 'nome_util'],
                                        'email',
                                        [sequelize.col('telemovel'), 'tel_util'],
                                        [sequelize.col('img_perfil'), 'img_util'],
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: trabalhos,
                    as: 'trabalhos',
                }
            ],
        });


        const todasAulas = await aulas.findAll({
            where: { id_curso: cursoId },
            include: [
                {
                    model: conteudos,
                    as: 'conteudos',
                    include: [
                        {
                            model: tipo_formato,
                            as: 'id_formato_tipo_formato',
                            attributes: ['id_formato', 'formato']
                        }
                    ],
                }
            ],
            order: [['id_aula', 'ASC']]
        });

        if (todasAulas.length === 0) {
            throw new Error('Nenhum aula encontrada para este curso');
        }

        const materialApoio = await material_apoio.findAll({
            where: { id_curso: cursoId },
            include: [
                {
                    model: tipo_formato,
                    as: 'id_formato_tipo_formato',
                    attributes: ['id_formato', 'formato']
                }
            ]
        });

        return {
            dadosCurso,
            todasAulas,
            materialApoio
        };
    } catch (error) {
        console.error('Erro ao buscar detalhes da aula:', error);
        throw error;
    }
}

async function getAulas(cursoID) {
    const cursoSincrono = await cursos.findOne({
        where: { id_curso: cursoID }
    });

    if (!cursoSincrono) {
        throw new Error('Curso não econtrado');
    }

    if (cursoSincrono.issincrono) {
        return [];
    }

    const todasAulas = await aulas.findAll({
        where: { id_curso: cursoID },
        include: [
            {
                model: conteudos,
                as: 'conteudos',
                include: [
                    {
                        model: tipo_formato,
                        as: 'id_formato_tipo_formato',
                        attributes: ['id_formato', 'formato']
                    }
                ]
            }
        ],
        order: [['id_aula', 'ASC']]
    });
    return todasAulas;
}

module.exports = {
    getAulasAndMateriaApoioForCurso,
    getAulas
};