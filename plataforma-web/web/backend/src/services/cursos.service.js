const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { cursos, inscricoes, resultados, area, topico, aulas, conteudos, formadores, modulos, sincrono } = require('../models/init-models')(sequelize);


/*APENAS PARA TESTES DESENVOLVIEMENTO!!!!!!!!!!!!!!!!!!!!! APGAR DEPOIS */
// async function updateFormandosCounter() {
//   try {
//     // Buscar contagem de inscrições ativas agrupadas por curso
//     const inscricoesPorCurso = await sequelize.query(`
//       SELECT id_curso, COUNT(id_inscricao) as total 
//       FROM inscricoes 
//       WHERE status_inscricao = 1 
//       GROUP BY id_curso
//     `, { type: sequelize.QueryTypes.SELECT });
    
//     // Atualizar cada curso com sua contagem
//     for (const item of inscricoesPorCurso) {
//       await cursos.update(
//         { contador_formandos: item.total },
//         { where: { id_curso: item.id_curso } }
//       );
//       console.log(`Contador atualizado para curso ${item.id_curso}: ${item.total} formandos`);
//     }
    
//     // Zerar contador para cursos sem inscrições ativas
//     const cursosComInscricoes = inscricoesPorCurso.map(i => i.id_curso);
//     await cursos.update(
//       { contador_formandos: 0 },
//       { 
//         where: { 
//           id_curso: { [Op.notIn]: cursosComInscricoes } 
//         } 
//       }
//     );
    
//     console.log('Atualização de contadores concluída com sucesso');
//     return { success: true, message: 'Contadores atualizados com sucesso' };
//   } catch (error) {
//     console.error('Erro ao atualizar contador de formandos:', error);
//     throw error;
//   }
// }



// Função para obter o curso síncrono em destaque(vai buscar o curso com mais inscricoes)
// Função para obter o curso síncrono em destaque(vai buscar o curso com mais inscricoes)
async function getCourseDestaqueSincrono() {
  try {
    const cursosOrdenados = await cursos.findAll({
      where: { issincrono: true },
      order: [['contador_formandos', 'DESC']]
    });

    for (const curso of cursosOrdenados) {
      const infoSincrono = await sincrono.findOne({
        where: { id_curso_sincrono: curso.id_curso }
      });

      if (!infoSincrono) continue;

      const temVagas = curso.contador_formandos < infoSincrono.numero_vagas;

      if (temVagas) {
        const cursosEmpatados = cursosOrdenados.filter(c =>
          c.contador_formandos === curso.contador_formandos
        );

        const cursosComVagas = [];

        for (const c of cursosEmpatados) {
          const info = await sincrono.findOne({
            where: { id_curso_sincrono: c.id_curso }
          });

          if (info && c.contador_formandos < info.numero_vagas) {
            cursosComVagas.push(c);
          }
        }

        if (cursosComVagas.length > 0) {
          const aleatorio = cursosComVagas[Math.floor(Math.random() * cursosComVagas.length)];
          return aleatorio;
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Erro ao procurar curso síncrono em destaque:', error);
    return null;
  }
}

// Função para obter o curso assíncrono em destaque(vai buscar o curso com mais inscricoes)
async function getCourseDestaqueAssincrono() {
  try {
    const featuredCourse = await cursos.findOne({
      where: {
        isassincrono: true
      },
      order: [['contador_formandos', 'DESC']]
    });
    if (!featuredCourse) return null;
    const maxFormandos = featuredCourse.contador_formandos;

    const cursosEmpatados = await cursos.findAll({
      where: {
        isassincrono: true,
        contador_formandos: maxFormandos
      }
    });

    if (cursosEmpatados.length === 0) return null;

    const aleatorio = cursosEmpatados[Math.floor(Math.random() * cursosEmpatados.length)];
    return aleatorio;
  } catch (error) {
    console.error('Erro ao procurar curso assíncrono em destaque:', error);
    return null;
  }
}

async function getCourseWithMoreFormandos() {
  try {
    // Buscar todos os cursos ordenados por contador_formandos
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
          required: false
          // Removida a referência a numero_vagas
        }
      ],
      order: [['contador_formandos', 'DESC']]
    });
    
    console.log(`Total de cursos encontrados: ${allCourses.length}`);
    
    // Filtrar cursos disponíveis
    const availableCourses = allCourses.filter(course => {
      // Para cursos síncronos: verificar se tem vagas disponíveis
      if (course.issincrono && course.sincrono) {
        const hasSpots = course.contador_formandos < course.sincrono.numero_vagas;
        console.log(`Curso síncrono ${course.id_curso}: ${course.contador_formandos}/${course.sincrono.numero_vagas} - Tem vagas: ${hasSpots}`);
        return hasSpots;
      } 
      // Para cursos assíncronos: sempre disponíveis (não dependem de numero_vagas)
      else if (course.isassincrono && course.assincrono) {
        console.log(`Curso assíncrono ${course.id_curso}: ${course.contador_formandos} formandos - Sempre disponível`);
        return true;
      }
      
      console.log(`Curso ${course.id_curso} não é válido (não tem relacionamento correto)`);
      return false;
    });

    console.log(`Cursos disponíveis: ${availableCourses.length}`);
    
    // Se não houver cursos disponíveis
    if (availableCourses.length === 0) {
      return null;
    }
    
    // Verificar se há vários cursos com o mesmo número máximo de formandos
    const maxFormandos = availableCourses[0].contador_formandos;
    const topCourses = availableCourses.filter(course => course.contador_formandos === maxFormandos);
    
    // Se houver vários cursos com o mesmo número de formandos, retornar um aleatoriamente
    if (topCourses.length > 1) {
      console.log(`${topCourses.length} cursos encontrados com ${maxFormandos} formandos. Selecionando um aleatoriamente.`);
      const randomIndex = Math.floor(Math.random() * topCourses.length);
      return topCourses[randomIndex];
    }
    
    // Caso contrário, retornar o curso com mais formandos
    return availableCourses[0];
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
        'isassincrono',
        'contador_formandos',
        'horas_curso',
        'idioma'
      ],
      include: []
    };

    // Adicionar JOIN com formadores para cursos síncronos
    if (tipologia === 'sincrono' || tipologia === null) {
      includeFilter.include.push({
        model: sequelize.models.sincrono,
        as: 'sincrono',
        required: false,
        include: [{
          model: formadores,
          as: 'id_formador_formadore',
          attributes: ['id_formador', 'nome_formador', 'email_formador', 'imagem_utilizador', 'descricao_formador']
        }]
      });
    } 
    
    if (tipologia === 'assincrono' || tipologia === null) {
      includeFilter.include.push({
        model: sequelize.models.assincrono,
        as: 'assincrono',
        required: false
      });
    }

    const enrolledCourses = await inscricoes.findAll({
      where: { 
        id_formando: userId,
        status_inscricao: 1
      },
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
      where: { 
        id_formando: userId,
        status_inscricao: 1 
      },
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
            'isassincrono',
            'horas_curso',
            'idioma'
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
              id_curso: curso.id_curso
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
          horas_curso: curso.horas_curso,
          idioma: curso.idioma,
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
    console.error('Erro ao buscar tópicos por área:', error);
    throw error;
  }
}

// Função para obter detalhes completos de um curso incluindo módulos e aulas
async function getCourseDetails(id_curso) {
  try {
    const courseDetails = await cursos.findOne({
      where: { id_curso: id_curso },
      include: [
        {
          model: modulos,
          as: 'modulos',
          attributes: ['id_modulo', 'titulo', 'descricao', 'ordem'],
          order: [['ordem', 'ASC']],
          include: [
            {
              model: aulas,
              as: 'aulas',
              attributes: ['id_aula', 'nome_aula', 'data_aula', 'caminho_url'],
              order: [['data_aula', 'ASC']],
              include: [
                {
                  model: conteudos,
                  as: 'conteudos',
                  attributes: ['id_conteudo', 'titulo', 'descricao', 'id_formato']
                }
              ]
            }
          ]
        },
        {
          model: sequelize.models.sincrono,
          as: 'sincrono',
          required: false,
          include: [{
            model: formadores,
            as: 'id_formador_formadore',
            attributes: ['id_formador', 'nome_formador', 'email_formador', 'imagem_utilizador', 'descricao_formador']
          }]
        },
        {
          model: sequelize.models.assincrono,
          as: 'assincrono',
          required: false
        }
      ]
    });

    return courseDetails;
  } catch (error) {
    console.error('Erro ao buscar detalhes do curso:', error);
    throw error;
  }
}

// Função para obter módulos e aulas de um curso
async function getCourseContent(id_curso) {
  try {
    const courseModules = await modulos.findAll({
      where: { id_curso: id_curso },
      attributes: ['id_modulo', 'titulo', 'descricao', 'ordem'],
      order: [['ordem', 'ASC']],
      include: [
        {
          model: aulas,
          as: 'aulas',
          attributes: ['id_aula', 'nome_aula', 'data_aula', 'caminho_url'],
          include: [
            {
              model: conteudos,
              as: 'conteudos',
              attributes: ['id_conteudo', 'titulo', 'descricao', 'id_formato']
            }
          ]
        }
      ]
    });

    return courseModules;
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
  getCourseContent,
  getCourseDetails,
  //updateFormandosCounter /*APENAS PARA TESTES DESENVOLVIEMENTO!!!!!!!!!!!!!!!!!!!!! APGAR DEPOIS */~

};