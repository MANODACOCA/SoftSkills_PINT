const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

async function getCommentsByPost(postId) {
        try {
            // Verifica se o post existe
            const post = await models.post.findByPk(postId);
            if (!post) {
                throw new Error('Post não encontrado');
            }

            // Busca os comentários com informações do autor
            const comments = await models.comentario.findAll({
                where: { id_post: postId },
                include: [
                    {
                        model: models.utilizador,
                        as: 'id_utilizador_utilizador',
                        attributes: ['id_utilizador', 'nome_utilizador', 'img_perfil']
                    }
                ],
                order: [['id_comentario', 'ASC']] // Ordena por ID crescente (mais antigos primeiro)
            });

            // Formata a resposta
            return comments.map(comment => ({
                id_comentario: comment.id_comentario,
                texto_comentario: comment.texto_comentario,
                contador_likes_com: comment.contador_likes_com,
                autor: {
                    id_utilizador: comment.id_utilizador_utilizador.id_utilizador,
                    nome: comment.id_utilizador_utilizador.nome_utilizador,
                    img_perfil: comment.id_utilizador_utilizador.img_perfil
                }
            }));
        } catch (error) {
            console.error('Erro no serviço getCommentsByPost:', error);
            throw error;
        }
    };


async function getConteudosByPost(postId) {
        try {
            // Verifica se o post existe
            const post = await models.post.findByPk(postId);
            if (!post) {
                throw new Error('Post não encontrado');
            }

            // Busca os conteúdos com informações do formato
            const conteudos = await models.conteudos_forum.findAll({
                where: { 
                    id_post: postId,
                    id_comentario: null // Garante que só pega conteúdos do post, não de comentários
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
            console.error('Erro no serviço getConteudosByPost:', error);
            throw error;
        }
};

module.exports = { getCommentsByPost, getConteudosByPost};