const { Sequelize, Op } = require('sequelize');
const sequelize = require('../models/database'); 
const { cursos } = require('../models/init-models')(sequelize); 

// Função para obter o curso síncrono em destaque
async function getCourseDestaqueSincrono() {
  
  const maxFormandosSubquery = await cursos.findOne({
    attributes: [
      [Sequelize.fn('MAX', Sequelize.col('contador_formandos')), 'max_formandos']
    ],
    where: {
      issincrono: true,
      contador_formandos: {
        [Op.lt]: Sequelize.col('numero_vagas') 
      }
    },
    raw: true
  });

 
  if (!maxFormandosSubquery || maxFormandosSubquery.max_formandos === null) {
    return null;
  }

  const featuredCourse = await cursos.findOne({
    where: {
      issincrono: true,
      contador_formandos: maxFormandosSubquery.max_formandos,
      numero_vagas: {
        [Op.gt]: Sequelize.col('contador_formandos') 
      }
    },
    order: Sequelize.literal('RANDOM()') 
  });

  return featuredCourse;
}

// Função para obter o curso assíncrono em destaque
async function getCourseDestaqueAssincrono() {
 
  const maxFormandosSubquery = await cursos.findOne({
    attributes: [
      [Sequelize.fn('MAX', Sequelize.col('contador_formandos')), 'max_formandos']
    ],
    where: {
      isassincrono: true,
      contador_formandos: {
        [Op.lt]: Sequelize.col('numero_vagas') 
      } 
    },
    raw: true
  });

  
  if (!maxFormandosSubquery || maxFormandosSubquery.max_formandos === null) {
    return null;
  }


  const featuredCourse = await cursos.findOne({
    where: {
      isassincrono: true,
      contador_formandos: maxFormandosSubquery.max_formandos,
      numero_vagas: {
        [Op.gt]: Sequelize.col('contador_formandos') 
      }
    },
    order: Sequelize.literal('RANDOM()') 
  });

  return featuredCourse;
}

module.exports = { getCourseDestaqueSincrono, getCourseDestaqueAssincrono };

