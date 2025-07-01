const { Sequelize, Op } = require('sequelize');
const sequelize = require('../models/database');
const { cursos, notificacoes_curso, utilizador } = require('../models/init-models')(sequelize);

async function getNotificationOfCourse(userID, order) {
  try {
    const notifications = await notificacoes_curso.findAll(
      {
        where: {
          id_utilizador: userID,
          data_hora_notificacaocurso: { [Op.lte]: Sequelize.literal('CURRENT_DATE') },
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

module.exports = {
  getNotificationOfCourse
};
