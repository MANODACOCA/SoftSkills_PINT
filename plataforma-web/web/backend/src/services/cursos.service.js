const { Sequelize, Op } = require('sequelize');
const sequelize = require('../models/database');
const { cursos, inscricoes, resultados, area, topico, aulas, conteudos } = require('../models/init-models')(sequelize);

// Função para obter o curso síncrono em destaque
async function getCourseDestaqueSincrono() {
  try {
    // Primeiro, encontrar o curso síncrono com o maior número de formandos
    // usando um JOIN entre as tabelas cursos e sincrono
    const featuredCourse = await cursos.findOne({
      include: [
        {
          model: sequelize.models.sincrono,
          as: 'sincrono',
          required: true, 
          attributes: ['numero_vagas']
        }
      ],
      where: {
        issincrono: true,
        contador_formandos: {
          [Op.lt]: Sequelize.col('sincrono.numero_vagas') // Compara com o campo na tabela sincrono
        }
      },
      order: [['contador_formandos', 'DESC'], Sequelize.literal('RANDOM()')],
      subQuery: false
    });

    return featuredCourse;
  } catch (error) {
    console.error('Erro ao procurar curso síncrono em destaque:', error);
    return null;
  }
}

// Função para obter o curso assíncrono em destaque
async function getCourseDestaqueAssincrono() {
  try {
    const featuredCourse = await cursos.findOne({
      include: [
        {
          model: sequelize.models.assincrono,
          as: 'assincrono',
          required: true,
          attributes: ['numero_vagas']
        }
      ],
      where: {
        isassincrono: true,
        contador_formandos: {
          [Op.lt]: Sequelize.col('assincrono.numero_vagas')
        }
      },
      order: [['contador_formandos', 'DESC'], Sequelize.literal('RANDOM()')],
      subQuery: false
    });

    return featuredCourse;
  } catch (error) {
    console.error('Erro ao procurar curso assíncrono em destaque:', error);
    return null;
  }
}

async function getCourseWithMoreFormandos() {
  try {
    // Buscar todos os cursos com suas vagas (sincronos e assincronos)
    const allCourses = await cursos.findAll({
      attributes: ['id_curso', 'nome_curso', 'imagem', 'contador_formandos', 'issincrono', 'isassincrono'],
      include: [
        {
          model: sequelize.models.sincrono,
          as: 'sincrono',
          required: false,
          attributes: ['numero_vagas']
        },
        {
          model: sequelize.models.assincrono,
          as: 'assincrono',
          required: false,
          attributes: ['numero_vagas']
        }
      ],
      order: [['contador_formandos', 'DESC']]
    });
    
    // Filtrar apenas cursos com vagas disponíveis
    const coursesWithSpots = allCourses.filter(course => {
      if (course.issincrono && course.sincrono) {
        return course.contador_formandos < course.sincrono.numero_vagas;
      } else if (course.isassincrono && course.assincrono) {
        return course.contador_formandos < course.assincrono.numero_vagas;
      }
      return false;
    });

    return coursesWithSpots.length > 0 ? coursesWithSpots[0] : null;
  } catch (error) {
    console.error('Erro ao procurar curso com mais formandos:', error);
    return null;
  }
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
      ],
      include: [] // Corrigido: vírgula removida e include colocado no lugar certo
    };

    // Adicionar JOIN com formadores para cursos síncronos
    if (tipologia === 'sincrono' || tipologia === null) {
      includeFilter.include.push({
        model: sequelize.models.sincrono,
        as: 'sincrono',
        required: false,
        include: [{
          model: sequelize.models.formadores,
          as: 'id_formador_formadore',
          attributes: ['nome_formador', 'email_formador', 'imagem_utilizador']
        }]
      });
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
        if (!curso) return null;

        const tipo = curso.issincrono ? 'sincrono' : curso.isassincrono ? 'assincrono' : 'outro';

        let notaFinal = null;
        if (curso.issincrono) {
          const resultado = await resultados.findOne({
            where: {
              id_formando: userId,
              id_curso_sincrono: curso.id_curso
            }
          });
          notaFinal = resultado ? resultado.nota_final : null; 
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

  
    return formattedCourses.filter(course => course !== null);
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

async function getTopicoForArea(id_area) {
  try {
    const listTopicos = await topico.findAll({
      where: {id_area: id_area},
      attributes: ['id_topico', 'nome_topico']
    });
    return listTopicos;
  } catch(error) {
    console.error('Erro ao buscar áreas por categoria:', error);
    throw error;
  }
}

// Encntrar módulos e aulas de um curso
async function getCourseContent(id_curso) {
  try {
    const courseContent = await aulas.findAll({
      where: { id_curso: id_curso },
      attributes: ['id_aula', 'nome_aula', 'data_aula'],
      include: [
        {
          model: conteudos,
          as: 'conteudos',
          attributes: ['id_conteudo', 'titulo', 'descricao', 'id_formato']
        }
      ],
      order: [['data_aula', 'ASC']]
    });

    return courseContent;
  } catch (error) {
    console.error('Erro ao procurar conteúdo do curso:', error);
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
  getTopicoForArea,
  getCourseContent 
};

