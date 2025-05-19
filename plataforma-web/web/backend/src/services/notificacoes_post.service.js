const sequelize = require('../models/database');
const {notificacoes_post, post, utilizador} = require('../models/init-models')(sequelize);

async function getNotificationOfPost() {
  try {
    const notifications = await notificacoes_post.findAll();
    
    const postIds = [...new Set(notifications.map(n => n.id_post))];
    const postList = await post.findAll({
      where: {
        id_post: postIds
      },
      attributes: ['id_post', 'id_utilizador']
    });

    const userIds = [...new Set(postList.map(p => p.id_utilizador))]
    const usersList = await utilizador.findAll({
        where: {
            id_utilizador: userIds
        },
        attributes: ['id_utilizador', 'nome_utilizador']
    });

    const postMap = {};
    postList.forEach(p => { postMap[p.id_post] = p;});

    const usersMap = {};
    usersList.forEach(u => { usersMap[u.id_utilizador] = u;});

    const result = notifications.map(n => {
      const notif = n.toJSON();
      const postObj = postMap[n.id_post];
      notif.post = postObj || null;
      notif.utilizador = postObj ? usersMap[postObj.id_utilizador] || null : null;
      return notif;
    });

    return result;
  } catch (error) {
    console.error('Erro ao buscar notificações de curso:', error);
    throw error;
  }
}

module.exports = {
  getNotificationOfPost
};
