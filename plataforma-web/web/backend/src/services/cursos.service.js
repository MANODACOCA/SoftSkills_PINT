const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { cursos, inscricoes, resultados, aulas, conteudos, formadores, sincrono, utilizador, formandos } = require('../models/init-models')(sequelize);


//esta funcao vai buscar todos os cursos que etsao disponiveis para inscricao
async function getCursosDiponiveisParaInscricao(tipo = "todos", id_curso = null) {
  const today = new Date();
  let cursosAssincronos = [];
  let cursosSincronosDisponiveis = [];

  if (tipo === "todos" || tipo === "assincrono") {
    cursosAssincronos = await cursos.findAll({
      where: {
        estado: true,
        issincrono: false,
        data_fim_inscricao: { [Op.gte]: today },
        ...(id_curso && { id_curso })
      },
      include: [
        {
          model: aulas,
          as: "aulas",
          attributes: ['id_aula', 'data_aula', 'nome_aula', 'caminho_url'],
          include: [
            {
              model: conteudos,
              as: "conteudos",
              attributes: ['id_conteudo', 'id_formato', 'nome_conteudo', 'conteudo', 'tempo_duracao'],
            }
          ]
        }
      ],
      order: [['id_curso', 'ASC']]
    });
  }

  if (tipo === "todos" || tipo === "sincrono") {
    const cursosSincronos = await cursos.findAll({
      where: {
        estado: true,
        issincrono: true,
        data_fim_inscricao: { [Op.gte]: today },
        ...(id_curso && { id_curso })
      },
      include: [
        {
          model: aulas,
          as: "aulas",
          attributes: ['id_aula', 'data_aula', 'nome_aula', 'caminho_url'],
          include: [
            {
              model: conteudos,
              as: "conteudos",
              attributes: ['id_conteudo', 'id_formato', 'nome_conteudo', 'conteudo', 'tempo_duracao'],
            }
          ]
        },
        {
          model: sincrono,
          as: "sincrono",
          attributes: ['id_curso_sincrono', 'numero_vagas'],
          include: [
            {
              model: formadores,
              as: "id_formador_formadore",
              attributes: ['id_formador', 'descricao_formador'],
              include: [
                {
                  model: utilizador,
                  as: "id_formador_utilizador",
                }
              ]
            }
          ]
        }
      ],
      order: [['id_curso', 'ASC']]
    });

    cursosSincronosDisponiveis = cursosSincronos.filter(curso => {
      return curso.contador_formandos < (curso.sincrono?.numero_vagas || 0);
    });
  }

  const cursosTodos = [...cursosAssincronos, ...cursosSincronosDisponiveis];
  const cursosDisponiveis = cursosTodos.map(curso => curso.toJSON());

  return cursosDisponiveis;
}

//vai retornar o curso com mais formandos, se houve mais que um faz um radom e seleciona um deles
async function getCourseWithMoreFormandos() {
  try {
    const cursosDisponiveis = await getCursosDiponiveisParaInscricao("todos");

    if (cursosDisponiveis.length === 0) return null;

    const maxFormandos = Math.max(...cursosDisponiveis.map(c => c.contador_formandos));
    const cursosTop = cursosDisponiveis.filter(c => c.contador_formandos === maxFormandos);

    return cursosTop[Math.floor(Math.random() * cursosTop.length)];
  } catch (error) {
    console.error('Erro ao procurar curso com mais formandos:', error);
    return null;
  }
}


// Função para colocar 8 cursos random
async function getCourseForYou() {
  try {
    const cursosDisponiveis = await getCursosDiponiveisParaInscricao("todos");

    const cursosEmbaralhados = cursosDisponiveis.sort(() => 0.5 - Math.random());

    return cursosEmbaralhados.slice(0, 8);
  } catch (error) {
    console.error('Erro ao procurar cursos:', error);
    throw error;
  }
}


// Função para colocar 8 cursos mais populares
async function getCoursePopular() {
  try {
    const limiteDesejado = 8;

    const cursosDisponiveis = await getCursosDiponiveisParaInscricao("todos");

    const cursosPopulares = cursosDisponiveis
      .sort((a, b) => b.contador_formandos - a.contador_formandos)
      .slice(0, limiteDesejado);

    return cursosPopulares;
  } catch (error) {
    console.error('Erro ao procurar cursos populares:', error);
    throw error;
  }
}


// Função para obter o curso assíncrono em destaque(vai buscar o curso com mais inscricoes)
async function getCourseDestaqueAssincrono() {
  try {
    const cursosDisponiveis = await getCursosDiponiveisParaInscricao("assincrono");

    if (cursosDisponiveis.length === 0) return null;

    const maxFormandos = Math.max(...cursosDisponiveis.map(c => c.contador_formandos));

    const cursosEmpatados = cursosDisponiveis.filter(c => c.contador_formandos === maxFormandos);

    return cursosEmpatados[Math.floor(Math.random() * cursosEmpatados.length)];
  } catch (error) {
    console.error('Erro ao procurar curso assíncrono em destaque:', error);
    return null;
  }
}


// Função para colocar 8 cursos mais recentes
async function getCourseNews() {
  try {
    const limiteDesejado = 8;

    const cursosDisponiveis = await getCursosDiponiveisParaInscricao("todos");

    const cursosMaisRecentes = cursosDisponiveis
      .sort((a, b) => new Date(b.data_inicio_inscricao) - new Date(a.data_inicio_inscricao))
      .slice(0, limiteDesejado);

    return cursosMaisRecentes;
  } catch (error) {
    console.error('Erro ao procurar cursos recentes:', error);
    throw error;
  }
}


// Função para obter o curso síncrono em destaque(vai buscar o curso com mais inscricoes)
async function getCourseDestaqueSincrono() {
  try {
    const cursosDisponiveis = await getCursosDiponiveisParaInscricao("sincrono");

    if (cursosDisponiveis.length === 0) return null;

    const maxFormandos = Math.max(...cursosDisponiveis.map(c => c.contador_formandos));

    const cursosEmpatados = cursosDisponiveis.filter(c => c.contador_formandos === maxFormandos);

    return cursosEmpatados[Math.floor(Math.random() * cursosEmpatados.length)];
  } catch (error) {
    console.error('Erro ao procurar curso síncrono em destaque:', error);
    return null;
  }
}


/*Esta funcao vai buscar todos os cursos em curso de um determinado formando*/
async function getEnrolledCoursesForUser(userId, tipologia = null) {
  try {
    if (!userId) {
      console.log('ID do formando não fornecido');
      return [];
    }
    
    const formando = await formandos.findByPk(userId);
    if (!formando) {
      console.log(`Formando com ID ${userId} não encontrado`);
      return [];
    }

    const whereClause = {
      id_formando: userId,
      status_inscricao: 1 
    };

    let cursoWhere = {};
    if (tipologia === 'sincrono') {
      cursoWhere.issincrono = true;
    } else if (tipologia === 'assincrono') {
      cursoWhere.isassincrono = true;
    }

    const enrolledCourses = await inscricoes.findAll({
      where: whereClause,
      include: [
        {
          model: cursos,
          as: 'id_curso_curso',
          where: Object.keys(cursoWhere).length > 0 ? cursoWhere : undefined,
          attributes: [
            'id_curso', 'nome_curso', 'descricao_curso', 'data_inicio_curso', 
            'data_fim_curso', 'imagem', 'issincrono', 'isassincrono', 
            'contador_formandos', 'horas_curso', 'idioma'
          ]
        }
      ],
      order: [['data_inscricao', 'DESC']]
    });

    console.log(`Encontradas ${enrolledCourses.length} inscrições para o utilizador ${userId} com tipologia ${tipologia || 'todos'}`);

    return enrolledCourses.filter(inscricao => inscricao.id_curso_curso);
  } catch (error) {
    console.error('Erro ao encontrar cursos inscritos para o utilizador:', error);
    throw error;
  }
}


/*Esta funcao vai buscar todos os cursos completosa de um determinado formando*/
async function getCompleteCoursesFromUser(userId, tipologia = null) {
  try {
    if (!userId) {
      console.log('ID do formando não fornecido');
      return [];
    }

    const formando = await formandos.findByPk(userId);
    if (!formando) {
      console.log(`Formando com ID ${userId} não encontrado`);
      return [];
    }

    const resultadosDoFormando = await resultados.findAll({
      where: {
        id_formando: userId,
      },
    });

    if (!resultadosDoFormando.length) {
      console.log(`Nenhum resultado encontrado para o formando ${userId}`);
      return [];
    }

   
    const idsCursos = resultadosDoFormando.map(r => r.id_curso_sincrono).filter(Boolean);

    if (!idsCursos.length) {
      console.log("Nenhum curso síncrono encontrado nos resultados.");
      return [];
    }

    let cursoWhere = {
      id_curso: { [Op.in]: idsCursos },
      data_fim_curso: { [Op.lt]: new Date() },
    };

    if (tipologia === 'sincrono') {
      cursoWhere.issincrono = true;
    } else if (tipologia === 'assincrono') {
      cursoWhere.isassincrono = true;
    }

    const cursosEncontrados = await cursos.findAll({
      where: cursoWhere,
    });

    const formattedCourses = cursosEncontrados.map(curso => {
      const resultado = resultadosDoFormando.find(r => r.id_curso_sincrono === curso.id_curso);
      const tipo = curso.issincrono ? 'sincrono' : curso.isassincrono ? 'assincrono' : 'outro';

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
        nota_final: resultado ? resultado.resul : null,
        concluido: true
      };
    });

    console.log(`Foram encontrados ${formattedCourses.length} cursos concluídos com base nos resultados do formando ${userId}.`);

    return formattedCourses;
  } catch (error) {
    console.error('Erro ao procurar cursos terminados para o utilizador:', error);
    throw error;
  }
}


/*APENAS PARA TESTES DESENVOLVIEMENTO!!!!!!!!!!!!!!!!!!!!! APGAR DEPOIS */
async function updateFormandosCounter() {
  try {
    // Buscar contagem de inscrições ativas agrupadas por curso
    const inscricoesPorCurso = await sequelize.query(`
      SELECT id_curso, COUNT(id_inscricao) as total 
      FROM inscricoes 
      WHERE status_inscricao = 1 
      GROUP BY id_curso
    `, { type: sequelize.QueryTypes.SELECT });
    
    // Atualizar cada curso com sua contagem
    for (const item of inscricoesPorCurso) {
      await cursos.update(
        { contador_formandos: item.total },
        { where: { id_curso: item.id_curso } }
      );
      console.log(`Contador atualizado para curso ${item.id_curso}: ${item.total} formandos`);
    }
  
    
    console.log('Atualização de contadores concluída com sucesso');
    return { success: true, message: 'Contadores atualizados com sucesso' };
  } catch (error) {
    console.error('Erro ao atualizar contador de formandos:', error);
    throw error;
  }
}
/*APENAS PARA TESTES DESENVOLVIEMENTO!!!!!!!!!!!!!!!!!!!!! APGAR DEPOIS */

module.exports = {
  getCursosDiponiveisParaInscricao,
  getCourseDestaqueSincrono,
  getCourseDestaqueAssincrono,
  getCourseWithMoreFormandos,
  getEnrolledCoursesForUser,
  getCompleteCoursesFromUser,
  getCourseForYou,
  getCourseNews,
  getCoursePopular,
  updateFormandosCounter,
};