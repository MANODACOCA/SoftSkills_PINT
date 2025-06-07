const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);


async function getConteudosByComentario(comentarioId) {
        try {
            // Verifica se o comentário existe
            const comentario = await models.comentario.findByPk(comentarioId);
            if (!comentario) {
                throw new Error('Comentário não encontrado');
            }

            // Busca os conteúdos com informações do formato
            const conteudos = await models.conteudos_forum.findAll({
                where: { 
                    id_comentario: comentarioId,
                    id_post: null // Garante que só pega conteúdos do comentário, não do post
                },
                include: [
                    {
                        model: models.tipo_formato,
                        as: 'id_formato_tipo_formato',
                        attributes: ['id_formato', 'formato']
                    }
                ],
                order: [['id_conteudos_forum', 'ASC']]
            });

            return conteudos.map(conteudo => ({
                id_conteudos_forum: conteudo.id_conteudos_forum,
                conteudo: conteudo.conteudo,
                formato: {
                    id_formato: conteudo.id_formato_tipo_formato.id_formato,
                    tipo: conteudo.id_formato_tipo_formato.formato
                }
            }));
        } catch (error) {
            console.error('Erro no serviço getConteudosByComentario:', error);
            throw error;
        }
}

module.exports = {getConteudosByComentario}