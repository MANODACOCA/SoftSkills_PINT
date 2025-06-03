// src/services/conteudo_partilhado_services.js

const { conteudos_partilhado, post, utilizador } = require('../models/init-models')(sequelize);

const conteudoPartilhadoService = {
    /**
     * Obtém todos os posts associados a um conteúdo partilhado específico
     * @param {number} conteudoPartilhadoId - ID do conteúdo partilhado
     * @returns {Promise<Array>} Lista de posts com informações básicas e autor
     */
    getPostsByConteudoPartilhado: async (conteudoPartilhadoId) => {
        try {
            // Verifica se o conteúdo partilhado existe
            const conteudoExistente = await conteudos_partilhado.findByPk(conteudoPartilhadoId);
            if (!conteudoExistente) {
                throw new Error('Conteúdo partilhado não encontrado');
            }

            // Busca os posts associados com informações do autor
            const posts = await post.findAll({
                where: {
                    id_conteudos_partilhado: conteudoPartilhadoId
                },
                include: [{
                    model: utilizador,
                    as: 'id_utilizador_utilizador', // Alias exato conforme associação
                    attributes: [
                        'id_utilizador', 
                        'nome_utilizador', 
                        'img_perfil',
                        'data_criacao_utiliz'
                    ]
                }],
                order: [['createdAt', 'DESC']],
                raw: false // Para garantir que os includes funcionem corretamente
            });

            // Formata os dados para resposta
            const formattedPosts = posts.map(post => {
                return {
                    id_post: post.id_post,
                    texto_post: post.texto_post,
                    createdAt: post.createdAt,
                    autor: {
                        id_utilizador: post.id_utilizador_utilizador.id_utilizador,
                        nome: post.id_utilizador_utilizador.nome_utilizador,
                        imagem: post.id_utilizador_utilizador.img_perfil,
                        membro_desde: post.id_utilizador_utilizador.data_criacao_utiliz
                    }
                };
            });

            return formattedPosts;
        } catch (error) {
            console.error('Erro detalhado no serviço:', {
                message: error.message,
                stack: error.stack,
                params: { conteudoPartilhadoId }
            });
            throw new Error('Falha ao recuperar posts. Por favor, tente novamente.');
        }
    }
};

module.exports = conteudoPartilhadoService;