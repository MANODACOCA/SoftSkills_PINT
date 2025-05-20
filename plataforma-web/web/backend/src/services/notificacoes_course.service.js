const sequelize = require('../models/database');
const { cursos, notificacoes_curso } = require('../models/init-models')(sequelize);

async function getNotificationOfCourse() {
  try {
    const notifications = await notificacoes_curso.findAll();
    
    const cursoIds =[...new Set(notifications.map(n => n.id_curso))];
    const cursosList = await cursos.findAll({
      where: {
        id_curso: cursoIds
      },
      attributes: ['id_curso', 'nome_curso', 'imagem']
    });

    const cursosMap = {};
    cursosList.forEach(c => {
      cursosMap[c.id_curso] = c;
    });

    return notifications.map(n => {
      const notif = n.toJSON();
      notif.id_notificacao_cursos = n.id_notificacao_cursos;
      notif.curso = cursosMap[n.id_curso] || null;
      return notif;
    });
  } catch (error) {
    console.error('Erro ao buscar notificações de curso:', error);
    throw error;
  }
}

module.exports = {
  getNotificationOfCourse
};
