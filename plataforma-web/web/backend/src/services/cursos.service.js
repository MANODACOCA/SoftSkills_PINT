const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { cursos, inscricoes, resultados, area, topico } = require('../models/init-models')(sequelize);

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

async function getCourseWithMoreFormandos() {

  const courseMoreFormandos = await cursos.findOne({
    attributes: ['nome_curso', 'imagem', 'contador_formandos'],
    where: {
      contador_formandos: {
        [Op.lt]: Sequelize.col('numero_vagas')
      }
    },
    order: [['contador_formandos', 'DESC']]
  });

  if (!courseMoreFormandos) {
    return null;
  }

  return courseMoreFormandos;
}

async function getEnrolledCoursesForUser(userId, tipologia = null) {
  try {
    const includeFilter = {
      model: cursos,
      as: 'id_curso_curso',
      attributes: [
        'id_curso',
        'nome_curso',
        'descricao_curso',
        'data_inicio_curso',
        'data_fim_curso',
        'imagem',
        'issincrono',
        'isassincrono'
      ]
    };

    if (tipologia === 'sincrono') {
      includeFilter.where = { issincrono: true };
    } else if (tipologia === 'assincrono') {
      includeFilter.where = { isassincrono: true };
    }

    const enrolledCourses = await inscricoes.findAll({
      where: { id_formando: userId },
      include: [includeFilter]
    });

    if (!enrolledCourses || enrolledCourses.length === 0) {
      return [];
    }

    return enrolledCourses.filter(c => c.id_curso_curso); 
  } catch (error) {
    console.error('Erro ao encontrar cursos inscritos para o utilizador:', error);
    throw error;
  }
}

async function getCompleteCoursesFromUser(userId) {
  try {
    const completedCourses = await inscricoes.findAll({
      where: { id_formando: userId },
      include: [
        {
          model: cursos,
          as: 'id_curso_curso',
          attributes: [
            'id_curso',
            'nome_curso',
            'descricao_curso',
            'data_inicio_curso',
            'data_fim_curso',
            'imagem',
            'issincrono',
            'isassincrono'
          ],
          where: {
            data_fim_curso: {
              [Op.lt]: new Date() 
            }
          }
        }
      ]
    });

    const formattedCourses = await Promise.all(
      completedCourses.map(async (inscricao) => {
        const curso = inscricao.id_curso_curso;

        const tipo = curso.issincrono ? 'sincrono' : curso.isassincrono ? 'assincrono' : 'outro';

        let notaFinal = null;
        if (curso.issincrono) {
          const resultado = await resultados.findOne({
            where: {
              id_formando: userId,
              id_curso_sincrono: curso.id_curso
            }
          });
          notaFinal = resultado ? resultado.resul : null;
        }

        return {
          id_curso: curso.id_curso,
          nome_curso: curso.nome_curso,
          descricao_curso: curso.descricao_curso,
          data_inicio_curso: curso.data_inicio_curso,
          data_fim_curso: curso.data_fim_curso,
          imagem: curso.imagem,
          tipo,
          nota_final: notaFinal,
          concluido: true 
        };
      })
    );

    return formattedCourses;
  } catch (error) {
    console.error('Erro ao procurar cursos terminados para o utilizador:', error);
    throw error;
  }
}

async function getAreaForCategoria(id_categoria) {
  try {
    const listAreas = await area.findAll({
      where: {
       id_categoria: id_categoria
      },
      attributes: ['id_area', 'nome_area']
    });

    return listAreas;
  } catch (error) {
    console.error('Erro ao procurar áreas por categoria:', error);
    throw error;
  }
}

async function getTopicoForArea (id_area){
    try{
    const listTopicos = await topico.findAll({
      where: {id_area: id_area},
      attributes:['id_topico', 'nome_topico']
    });
    return listTopicos;
  }catch(error){
    console.error('Erro ao buscar áreas por categoria');
    throw error;
  }
}

module.exports = { 
  getCourseDestaqueSincrono, 
  getCourseDestaqueAssincrono, 
  getCourseWithMoreFormandos, 
  getEnrolledCoursesForUser,
  getCompleteCoursesFromUser,
  getAreaForCategoria,
  getTopicoForArea};

