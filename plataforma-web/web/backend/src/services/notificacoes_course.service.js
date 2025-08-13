const { Sequelize, Op } = require('sequelize');
const sequelize = require('../models/database');
const { cursos, notificacoes_curso, utilizador } = require('../models/init-models')(sequelize);

async function getNotificationOfCourse(userID, order) {
  try {
    const now = new Date();
    const notifications = await notificacoes_curso.findAll(
      {
        where: {
          id_utilizador: userID,
          data_hora_notificacaocurso: { [Op.lte]: now },
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
        ],
        order: [
          ['data_hora_notificacaocurso', order === 'antigo' ? 'ASC' : 'DESC']
        ]
      }
    );
    return notifications || [];
  } catch (error) {
    console.error('Erro ao buscar notificações de curso:', error);
    throw error;
  }
}

async function countNotificationOfUser(userID) {
  try {
    if (!userID) return res.status(400).json({ error: 'Falta o userId.' });

    const total = await notificacoes_curso.count({
      where: { id_utilizador: userID },
    });

    return total || 0;

  } catch (error) {
    console.error('Erro ao obter count de notificaoes:', error);
    throw error;
  }
}

module.exports = {
  getNotificationOfCourse,
  countNotificationOfUser
};
