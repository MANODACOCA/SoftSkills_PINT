const sequelize = require('../models/database');
const {notificacoes_comentarios_post, post, utilizador} = require('../models/init-models')(sequelize);

async function getNotificationOfPost() {
  try {
    const notifications = await notificacoes_comentarios_post.findAll();

    const comentarioIds = notifications.map(n => n.id_comentario);

    const comentarios = await comentario.findAll({
      where: {
        id_comentario: comentarioIds
      },
      attributes: ['id_comentario', 'id_post', 'id_utilizador', 'texto_comentario']
    });

    const postIds = [...new Set(comentarios.map(c => c.id_post))];
    const posts = await post.findAll({
      where: {
        id_post: postIds
      },
      attributes: ['id_post', 'id_utilizador', 'texto_post']
    });

    const utilizadorIds = [
      ...new Set([
        ...notifications.map(n => n.id_utilizador),                 
        ...comentarios.map(c => c.id_utilizador),                  
        ...posts.map(p => p.id_utilizador)                        
      ])
    ];

    const utilizadores = await utilizador.findAll({
      where: {
        id_utilizador: utilizadorIds
      },
      attributes: ['id_utilizador', 'nome_utilizador']
    });

 
    const comentariosMap = Object.fromEntries(comentarios.map(c => [c.id_comentario, c]));
    const postsMap = Object.fromEntries(posts.map(p => [p.id_post, p]));
    const utilizadoresMap = Object.fromEntries(utilizadores.map(u => [u.id_utilizador, u]));

   
    const result = notifications.map(n => {
      const notif = n.toJSON();
      const comentario = comentariosMap[n.id_comentario];
      const post = comentario ? postsMap[comentario.id_post] : null;
      const autorComentario = comentario ? utilizadoresMap[comentario.id_utilizador] : null;
      const donoPost = post ? utilizadoresMap[post.id_utilizador] : null;
      const utilizadorNotificado = utilizadoresMap[n.id_utilizador];

      return {
        id_notificacao: n.id_notificacao_comentarios_post,
        data_hora: n.data_hora_notificacaoocp,
        comentario: comentario || null,
        post: post || null,
        autorComentario: autorComentario || null,
        donoPost: donoPost || null,
        notificado: utilizadorNotificado || null
      };
    });

    return result;
  } catch (error) {
    console.error('Erro ao buscar notificações de post:', error);
    throw error;
  }
}

module.exports = {
  getNotificationOfPost
};
