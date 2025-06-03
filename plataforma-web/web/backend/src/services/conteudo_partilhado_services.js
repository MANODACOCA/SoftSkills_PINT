const initModels = require('../models/init-models');
const sequelize = require('../models/database');

const models = initModels(sequelize);

const conteudoPartilhadoService = {
    getPostsByConteudoPartilhado: async (conteudoPartilhadoId) => {
        try {
            // Verifica se o conteúdo partilhado existe
            const conteudo = await models.conteudos_partilhado.findByPk(conteudoPartilhadoId);
            if (!conteudo) {
                throw new Error('Conteúdo partilhado não encontrado');
            }

            // Busca os posts com informações do autor
            const posts = await models.post.findAll({
                where: { id_conteudos_partilhado: conteudoPartilhadoId },
                include: [
                    {
                        model: models.utilizador,
                        as: 'id_utilizador_utilizador',
                        attributes: ['id_utilizador', 'nome_utilizador', 'img_perfil']
                    }
                ],
                order: [['id_post', 'DESC']] // Ordena por ID decrescente (mais recentes primeiro)
            });

            if (!posts || posts.length === 0) {
                throw new Error('Nenhum post encontrado para este conteúdo partilhado');
            }

            // Formata a resposta para incluir informações úteis
            return posts.map(post => ({
                id_post: post.id_post,
                texto_post: post.texto_post,
                contador_likes_post: post.contador_likes_post,
                contador_comentarios: post.contador_comentarios,
                autor: {
                    id_utilizador: post.id_utilizador_utilizador.id_utilizador,
                    nome: post.id_utilizador_utilizador.nome_utilizador,
                    img_perfil: post.id_utilizador_utilizador.img_perfil
                },
                data_criacao: post.data_criacao // Adicione este campo se existir na tabela
            }));
        } catch (error) {
            console.error('Erro no serviço getPostsByConteudoPartilhado:', error);
            throw error;
        }
    }
};

module.exports = conteudoPartilhadoService;