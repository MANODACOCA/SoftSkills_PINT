const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { conteudos_partilhado, topico, post, utilizador, area } = require('../models/init-models')(sequelize);



async function getPostsByConteudoPartilhado (conteudoPartilhadoId) {
        try {
            // Verifica se o conteúdo partilhado existe
            const conteudo = await conteudos_partilhado.findByPk(conteudoPartilhadoId);
            if (!conteudo) {
                throw new Error('Conteúdo partilhado não encontrado');
            }

            // Busca os posts com informações do autor
            const posts = await post.findAll({
                where: { id_conteudos_partilhado: conteudoPartilhadoId },
                include: [
                    {
                        model: utilizador,
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

async function filtrarConteudosPartilhados(filtros) {
  try {
    const whereClause = {};
    const include = [];

    // Always include the topic information
    const includeTopico = {
      model: topico,
      as: 'id_topico_topico',
      attributes: ['id_topico', 'nome_topico', 'id_area'],
      required: true // Use inner join for filtering
    };

    // If filtering by area, include area model
    if (filtros.id_area) {
      includeTopico.include = [{
        model: area,
        as: 'id_area_area',
        attributes: ['id_area', 'nome_area'],
        where: { id_area: filtros.id_area },
        required: true // Use inner join for filtering
      }];
    }

    // Filter by topic ID if provided
    if (filtros.id_topico) {
      whereClause.id_topico = filtros.id_topico;
    }

    include.push(includeTopico);

    // Final query
    const resultados = await conteudos_partilhado.findAll({
      where: whereClause,
      include: include,
      order: [['data_criacao_cp', 'DESC']],
    });

    return resultados;
  } catch (error) {
    console.error('Erro ao filtrar conteúdos:', error);
    throw error;
  }
}

module.exports = {
    getForuns,
    getPostsByConteudoPartilhado,
    filtrarConteudosPartilhados,
};