const sequelize = require('../models/database');
const utilizador = require('../models/utilizador');
const { cursos, notificacoes_curso } = require('../models/init-models')(sequelize);

async function getNotificationOfCourse(id) {
  try {
    const notifications = await notificacoes_curso.findAll(
      {
        where: {
          id_utilizador: id,
        },
        include: [
          {
            model: cursos,
            as: 'id_curso_curso',
          },
          {
            model: utilizador,
            as: 'id_utilizador_utilizador',
          }
        ]
      }
    );
    return notifications;
  } catch (error) {
    console.error('Erro ao buscar notificações de curso:', error);
    throw error;
  }
}

module.exports = {
  getNotificationOfCourse
};
