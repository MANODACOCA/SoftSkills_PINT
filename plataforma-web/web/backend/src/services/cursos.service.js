const { Sequelize, Op, where, Model, literal } = require('sequelize');
const sequelize = require('../models/database');
const { cursos, inscricoes, resultados, aulas, conteudos, formadores, sincrono, utilizador, formandos, assincrono, gestor_administrador, topico, area, categoria, ocorrencias_edicoes, material_apoio, tipo_formato } = require('../models/init-models')(sequelize);
const ocorrenciaService = require('./ocorrencias.service');
const { getVideoDuration } = require('../utils/youtube_aulas');
const isYoutubeLink = (url) => {
  return /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}(?:&.*)?$/i.test(url)
      || /^https:\/\/youtu\.be\/[\w-]{11}(?:\?.*)?$/i.test(url);
};

//esta funcao vai buscar todos os cursos que etsao disponiveis para inscricao
async function getCursosDiponiveisParaInscricao(tipo = "todos", id_curso = null, search = "", topicosIDs = []) {

  let cursosAssincronosDisponiveis = [];
  let cursosSincronosDisponiveis = [];

  const baseWhereAssincrono = {//filtros
    estado: true,
    issincrono: false,
    data_inicio_inscricao: { [Op.lte]: Sequelize.literal("DATE(NOW() AT TIME ZONE 'Europe/Lisbon')") },
    data_fim_inscricao: { [Op.gte]: Sequelize.literal("DATE(NOW() AT TIME ZONE 'Europe/Lisbon')") },
  };

  const baseWhereSincrono = {//filtros
    estado: true,
    issincrono: true,
    data_inicio_inscricao: { [Op.lte]: Sequelize.literal("DATE(NOW() AT TIME ZONE 'Europe/Lisbon')") },
    data_fim_inscricao: { [Op.gte]: Sequelize.literal("DATE(NOW() AT TIME ZONE 'Europe/Lisbon')") },
  };

  if (id_curso) {
    baseWhereAssincrono.id_curso = id_curso;
    baseWhereSincrono.id_curso = id_curso;
  }

  if (search) {

    const unaccentedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const searchFilter = Sequelize.where(
      Sequelize.fn('unaccent', Sequelize.col('nome_curso')),
      {
        [Op.iLike]: `%${unaccentedSearch}%`
      }
    );

    baseWhereAssincrono[Op.and] = [searchFilter];
    baseWhereSincrono[Op.and] = [searchFilter];
  }


  if (topicosIDs.length > 0) {
    baseWhereAssincrono.id_topico = { [Op.in]: topicosIDs };
    baseWhereSincrono.id_topico = { [Op.in]: topicosIDs };
  }

  if (tipo === "todos" || tipo === "assincrono") {
    cursosAssincronosDisponiveis = await cursos.findAll({
      where: baseWhereAssincrono,
      include: [
        {
          model: aulas,
          as: "aulas",
          order: [['data_aula', 'ASC']],
          attributes: ['id_aula', 'data_aula', 'nome_aula', 'caminho_url', 'tempo_duracao'],
          include: [
            {
              model: conteudos,
              as: "conteudos",
              attributes: ['id_conteudo', 'id_formato', 'nome_conteudo', 'conteudo'],
            }
          ]
        }
      ],
      order: [['id_curso', 'ASC']]
    });
  }

  if (tipo === "todos" || tipo === "sincrono") {
    const cursosSincronos = await cursos.findAll({
      where: baseWhereSincrono,
      include: [
        {
          model: aulas,
          as: "aulas",
          order: [['data_aula', 'ASC']],
          attributes: ['id_aula', 'data_aula', 'nome_aula', 'caminho_url', 'tempo_duracao'],
          include: [
            {
              model: conteudos,
              as: "conteudos",
              attributes: ['id_conteudo', 'id_formato', 'nome_conteudo', 'conteudo'],
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
                  attributes: [
                    [sequelize.col('id_utilizador'), 'id_util'],
                    [sequelize.col('nome_utilizador'), 'nome_util'],
                    [sequelize.col('img_perfil'), 'img_perfi']
                  ]
                }
              ]
            }
          ]
        }
      ],
      order: [['id_curso', 'ASC']]
    });

    cursosSincronosDisponiveis = cursosSincronos;

  }

  const cursosTodos = [...cursosAssincronosDisponiveis, ...cursosSincronosDisponiveis];
  const cursosDisponiveis = cursosTodos
    .map(curso => curso.toJSON());

  return cursosDisponiveis;
}

//vai retornar o curso com mais formandos, se houve mais que um faz um radom e seleciona um deles
async function getCourseWithMoreFormandos() {
  try {
    const cursosDisponiveiSincronos = await getCursosDiponiveisParaInscricao("sincrono");
    const cursosDisponiveiAssincronos = await getCursosDiponiveisParaInscricao("assincrono");

    const cursosComVagas = cursosDisponiveiSincronos.filter(
      curso => curso.contador_formandos < curso.sincrono.numero_vagas
    );

    const cursosDisponiveis = [...cursosComVagas, ...cursosDisponiveiAssincronos];

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

    const cursosComVagas = cursosDisponiveis.filter(
      curso => curso.contador_formandos < curso.sincrono.numero_vagas
    );

    if (cursosComVagas.length === 0) return null;

    const maxFormandos = Math.max(...cursosComVagas.map(c => c.contador_formandos));

    const cursosEmpatados = cursosComVagas.filter(c => c.contador_formandos === maxFormandos);

    return cursosEmpatados[Math.floor(Math.random() * cursosEmpatados.length)];
  } catch (error) {
    console.error('Erro ao procurar curso síncrono em destaque:', error);
    return null;
  }
}

/*Esta funcao vai buscar todos os cursos em curso de um determinado formando*/
async function getEnrolledCoursesForUser(userId, tipologia = null, search, data_inicio_curso, data_fim_curso) {
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
      status_inscricao: 1,
    };

    let cursoWhere = {
      data_fim_curso: {
        [Op.gte]: literal("DATE(NOW() AT TIME ZONE 'Europe/Lisbon')")
      }
    };

    if (tipologia === 'sincrono') {
      cursoWhere.issincrono = true;
    } else if (tipologia === 'assincrono') {
      cursoWhere.isassincrono = true;
    }

    if (data_inicio_curso && !data_fim_curso) {
      cursoWhere.data_inicio_curso = {
        [Op.eq]: new Date(data_inicio_curso)
      };
    }

    if (data_fim_curso && !data_inicio_curso) {
      cursoWhere.data_fim_curso = {
        [Op.eq]: new Date(data_fim_curso)
      };
    }

    if (data_inicio_curso && data_fim_curso) {
      cursoWhere[Op.and] = cursoWhere[Op.and] || [];
      cursoWhere[Op.and].push({
        data_inicio_curso: { [Op.lte]: new Date(data_fim_curso) },
        data_fim_curso: { [Op.gte]: new Date(data_inicio_curso) }
      });
    }

    if (search) {
      const unaccentedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const searchFilter = Sequelize.literal(
        `unaccent("id_curso_curso"."nome_curso") ILIKE '%${unaccentedSearch}%'`
      );
      cursoWhere[Op.and] = cursoWhere[Op.and] || [];
      cursoWhere[Op.and].push(searchFilter);
    }

    const enrolledCourses = await inscricoes.findAll({
      where: whereClause,
      include: [
        {
          model: cursos,
          as: 'id_curso_curso',
          where: cursoWhere,
          attributes: [
            'id_curso', 'nome_curso', 'descricao_curso', 'data_inicio_curso',
            'data_fim_curso', 'imagem', 'issincrono', 'isassincrono',
            'contador_formandos', 'horas_curso', 'idioma'
          ],
          include: [
            {
              model: sincrono,
              as: 'sincrono',
              include: [
                {
                  model: formadores,
                  as: 'id_formador_formadore',
                  include: [
                    {
                      model: utilizador,
                      as: 'id_formador_utilizador',
                      attributes: ['id_utilizador', 'nome_utilizador', 'img_perfil']
                    }
                  ]
                }
              ]
            }
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
async function getCompleteCoursesFromUser(userId, tipologia = null, search, data_inicio_curso, data_fim_curso) {

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
      status_inscricao: 1,
    };

    let cursoWhere = {
      data_fim_curso: {
        [Op.lt]: literal("DATE(NOW() AT TIME ZONE 'Europe/Lisbon')")
      }
    };

    if (tipologia === 'sincrono') {
      cursoWhere.issincrono = true;
    } else if (tipologia === 'assincrono') {
      cursoWhere.isassincrono = true;
    }

    if (data_inicio_curso && !data_fim_curso) {
      cursoWhere.data_inicio_curso = {
        [Op.eq]: new Date(data_inicio_curso)
      };
    }

    if (data_fim_curso && !data_inicio_curso) {
      cursoWhere.data_fim_curso = {
        [Op.eq]: new Date(data_fim_curso)
      };
    }

    if (data_inicio_curso && data_fim_curso) {
      cursoWhere[Op.and] = cursoWhere[Op.and] || [];
      cursoWhere[Op.and].push({
        data_inicio_curso: { [Op.lte]: new Date(data_inicio_curso) },
        data_fim_curso: { [Op.gte]: new Date(data_fim_curso) }
      });
    }

    if (search) {
      const unaccentedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const searchFilter = Sequelize.literal(
        `unaccent("id_curso_curso"."nome_curso") ILIKE '%${unaccentedSearch}%'`
      );
      cursoWhere[Op.and] = cursoWhere[Op.and] || [];
      cursoWhere[Op.and].push(searchFilter);
    }

    const inscricoesComCursos = await inscricoes.findAll({//aqui vai buscar todas os cursos que tem inscricao daquele formando 
      where: whereClause,
      include: [
        {
          model: cursos,
          as: 'id_curso_curso',
          where: cursoWhere,
          attributes: [
            'id_curso', 'nome_curso', 'descricao_curso', 'data_inicio_curso',
            'data_fim_curso', 'imagem', 'issincrono', 'isassincrono',
            'contador_formandos', 'horas_curso', 'idioma'
          ],
        }
      ],
      order: [['data_inscricao', 'DESC']]
    });

    const cursosComNota = [];

    for (const inscricao of inscricoesComCursos) {
      const curso = inscricao.id_curso_curso;
      if (!curso) continue;

      const resultado = await resultados.findOne({ // Buscar resultado final do formando para esse curso
        where: {
          id_curso_sincrono: curso.id_curso,
          id_formando: userId
        },
        attributes: ['resul']
      });

      cursosComNota.push({
        id_curso: curso.id_curso,
        nome_curso: curso.nome_curso,
        descricao_curso: curso.descricao_curso,
        data_inicio_curso: curso.data_inicio_curso,
        data_fim_curso: curso.data_fim_curso,
        imagem: curso.imagem,
        tipo: curso.issincrono ? 'sincrono' : curso.isassincrono ? 'assincrono' : 'outro',
        horas_curso: curso.horas_curso,
        idioma: curso.idioma,
        nota_final: resultado ? resultado.resul : null,
        concluido: true
      });
    }

    return cursosComNota;

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

async function getAllCoursesWithAllInfo(search = "") {
  try {
    const today = new Date().toISOString().slice(0, 10); 

    await cursos.update(
      { estado: false },
      {
        where: {
          data_fim_curso: { [Op.lt]: Sequelize.literal("DATE(NOW() AT TIME ZONE 'Europe/Lisbon')") },
          estado: true
        }
      }
    );
    
    const whereClause = {};

    if (search) {
      const unaccentedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      whereClause[Op.and] = [
        Sequelize.where(
          Sequelize.fn('unaccent', Sequelize.col('nome_curso')),
          {
            [Op.iLike]: `%${unaccentedSearch}%`
          }
        )
      ];
    }

    const cursoInfoTotal = await cursos.findAll({
      where: whereClause,
      attributes: [
        'id_curso',
        'nome_curso',
        'data_inicio_curso',
        'data_fim_curso',
        'data_inicio_inscricao',
        'data_fim_inscricao',
        'issincrono',
        'isassincrono',
        'horas_curso',
        'contador_formandos',
        'estado',
        'id_gestor_administrador',
        'imagem',
        'idioma',
        'descricao_curso',
      ],
      include: [
        {
          model: ocorrencias_edicoes,
          as: 'ocorrencias_edicos',
        },
        {
          model: sincrono,
          as: 'sincrono',
          attributes: ['numero_vagas'],
          include: [
            {
              model: formadores,
              as: 'id_formador_formadore',
              attributes: ['id_formador', 'descricao_formador'],
              include: [
                {
                  model: utilizador,
                  as: 'id_formador_utilizador',
                  attributes: [
                    [sequelize.col('id_utilizador'), 'id_util'],
                    [sequelize.col('nome_utilizador'), 'nome_util']
                  ]
                }
              ]
            }
          ]
        },
        {
          model: gestor_administrador,
          as: 'id_gestor_administrador_gestor_administrador',
          include: [
            {
              model: utilizador,
              as: 'id_gestor_administrador_utilizador',
              attributes: ['nome_utilizador'],
            }
          ]
        },
        {
          model: topico,
          as: 'id_topico_topico',
          attributes: ['id_topico', 'nome_topico'],
          include: [
            {
              model: area,
              as: 'id_area_area',
              attributes: ['id_area', 'nome_area'],
              include: [
                {
                  model: categoria,
                  as: 'id_categoria_categorium',
                  attributes: [
                    [sequelize.col('id_categoria'), 'id_catego'],
                    'nome_cat'
                  ]
                }
              ]
            }
          ]
        }
      ],
      distinct: true,
      order: [
        ['estado', 'DESC'],
        ['id_curso', 'ASC']
      ]
    });

    return cursoInfoTotal;

  } catch (error) {
    console.error('Erro ao encontrar a lista completa dos cursos:', error);
    throw error;
  }
}

async function getCursoWithAllInfoOneCourse(id) {
  try {
    const curso = await cursos.findOne({
      where: { id_curso: id },
      attributes: [
        'id_curso',
        'nome_curso',
        'data_inicio_curso',
        'data_fim_curso',
        'data_inicio_inscricao',
        'data_fim_inscricao',
        'issincrono',
        'isassincrono',
        'horas_curso',
        'contador_formandos',
        'estado',
        'id_gestor_administrador',
        'idioma',
        'imagem',
        'descricao_curso',
        'id_topico',
      ],
      include: [
        {
          model: sincrono,
          as: 'sincrono',
          attributes: ['numero_vagas', 'id_formador'],
          include: [
            {
              model: formadores,
              as: 'id_formador_formadore',
              attributes: ['id_formador', 'descricao_formador'],
              include: [
                {
                  model: utilizador,
                  as: 'id_formador_utilizador',
                  attributes: [
                    [sequelize.col('id_utilizador'), 'id_util'],
                    [sequelize.col('nome_utilizador'), 'nome_util'],
                    [sequelize.col('img_perfil'), 'img_perfi'],
                    [sequelize.col('pais'), 'pais'],
                    [sequelize.col('email'), 'email'],
                  ]
                }
              ]
            }
          ]
        },
        {
          model: gestor_administrador,
          as: 'id_gestor_administrador_gestor_administrador',
          include: [
            {
              model: utilizador,
              as: 'id_gestor_administrador_utilizador',
              attributes: ['nome_utilizador']
            }
          ]
        },
        {
          model: topico,
          as: 'id_topico_topico',
          attributes: ['nome_topico', 'id_area'],
          include: [
            {
              model: area,
              as: 'id_area_area',
              attributes: ['nome_area', 'id_categoria'],
              include: [
                {
                  model: categoria,
                  as: 'id_categoria_categorium',
                  attributes: ['nome_cat'],
                }
              ]
            }
          ]
        }
      ]
    });

    return curso;

  } catch (error) {
    console.error('Erro ao buscar o curso com info completa:', error);
    throw error;
  }
}


async function createCursoCompleto(reqBody) {
  try {
    const { cursoData, sincrono: sincronoBody, id_curso_anterior } = reqBody;

    const curso = await cursos.create(cursoData);
    
    if (curso) {
      await ocorrenciaService.createNovaOcorrencia({
        idCursoNovo: curso.id_curso,
        idCursoAnterior: id_curso_anterior || null,
      });
    }

    if (cursoData.issincrono && sincronoBody) {
      await sincrono.create({
        id_curso_sincrono: curso.id_curso,
        id_formador: sincronoBody.id_formador,
        numero_vagas: sincronoBody.numero_vagas,
      });
    }

    if (id_curso_anterior) {
      await clonarConteudoDeCurso({
        idCursoAnterior: id_curso_anterior,
        idCursoNovo: curso.id_curso,
        ignorarAulas: cursoData.issincrono === true,
      });
    }
    return curso;
  } catch (error) {
    console.error('Erro no service ao criar curso:', error);
    throw error;
  }
}

async function updateCursoCompleto(reqBody) {
  try {
    const { cursoData, sincrono: sincronoBody } = reqBody;

    const { id_curso, ...dataToUpdate } = cursoData;

    await cursos.update(dataToUpdate, {
      where: { id_curso }
    });

    if (cursoData.issincrono === true && sincronoBody) {
      await sincrono.update(
        {
          id_formador: sincronoBody.id_formador,
          numero_vagas: sincronoBody.numero_vagas
        },
        {
          where: { id_curso_sincrono: id_curso }
        }
      );
    }

    return await cursos.findByPk(id_curso);
  } catch (error) {
    console.error('Erro no service ao atualizar curso:', error);
    throw error;
  }
}

//Aqui vamos verificar se o utilizador esta inscrito
async function verifyInscription(userId, cursoId) {
  try {

    const inscricaoUser = await inscricoes.findOne({
      where: {
        id_formando: userId,
        id_curso: cursoId,
        status_inscricao: 1
      }
    });

    if (!inscricaoUser) {
      return { inscrito: false };
    }


    return {
      inscrito: true,
    };

  } catch (error) {
    console.error('Erro ao verificar inscricao', error);
    throw error;
  }
}

async function getCursosLecionadosTerminadosService(userId, search, data_inicio_curso, data_fim_curso) {
  try {
    const today = new Date().toISOString().split('T')[0];

    const whereCurso = {
      data_fim_curso: { [Op.lte]: Sequelize.literal(`DATE(NOW() AT TIME ZONE 'Europe/Lisbon')`) }
    };

    if (search) {
      const unaccentedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const searchFilter = Sequelize.literal(
        `unaccent("id_curso_sincrono_curso"."nome_curso") ILIKE '%${unaccentedSearch}%'`
      );

      whereCurso[Op.and] = whereCurso[Op.and] || [];
      whereCurso[Op.and].push(searchFilter);
    }

    if (data_inicio_curso && !data_fim_curso) {
      whereCurso.data_inicio_curso = {
        [Op.eq]: new Date(data_inicio_curso)
      };
    }

    if (data_fim_curso && !data_inicio_curso) {
      whereCurso.data_fim_curso = {
        [Op.eq]: new Date(data_fim_curso)
      };
    }

    if (data_inicio_curso && data_fim_curso) {
      whereCurso[Op.and] = whereCurso[Op.and] || [];
      whereCurso[Op.and].push({
        data_inicio_curso: { [Op.lte]: new Date(data_fim_curso) },
        data_fim_curso: { [Op.gte]: new Date(data_inicio_curso) }
      });
    }

    const cursoLecionado = await sincrono.findAll({
      where: {
        id_formador: userId,
      },
      include: [
        {
          model: cursos,
          as: 'id_curso_sincrono_curso',
          where: whereCurso,
        }
      ]
    });

    return cursoLecionado;
  } catch (error) {
    console.error('Erro ao encontrar cursos lecionados terminados para o utilizador:', error);
    throw error;
  }
}

async function getCursosLecionadosAtualmenteService(userId, search, data_inicio_curso, data_fim_curso) {
  try {
    const today = new Date().toISOString().split('T')[0];

    const whereCurso = {
      data_fim_curso: { [Op.gte]: Sequelize.literal(`DATE(NOW() AT TIME ZONE 'Europe/Lisbon')`) }
    };

    if (search) {
      const unaccentedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const searchFilter = Sequelize.literal(
        `unaccent("id_curso_sincrono_curso"."nome_curso") ILIKE '%${unaccentedSearch}%'`
      );

      whereCurso[Op.and] = whereCurso[Op.and] || [];
      whereCurso[Op.and].push(searchFilter);
    }

    if (data_inicio_curso && !data_fim_curso) {
      whereCurso.data_inicio_curso = {
        [Op.eq]: new Date(data_inicio_curso)
      };
    }

    if (data_fim_curso && !data_inicio_curso) {
      whereCurso.data_fim_curso = {
        [Op.eq]: new Date(data_fim_curso)
      };
    }

    if (data_inicio_curso && data_fim_curso) {
      whereCurso[Op.and] = whereCurso[Op.and] || [];
      whereCurso[Op.and].push({
        data_inicio_curso: { [Op.lte]: new Date(data_fim_curso) },
        data_fim_curso: { [Op.gte]: new Date(data_inicio_curso) }
      });
    }

    const cursoLecionado = await sincrono.findAll({
      where: {
        id_formador: userId,
      },
      include: [
        {
          model: cursos,
          as: 'id_curso_sincrono_curso',
          where: whereCurso,
        }
      ]
    });

    return cursoLecionado;
  } catch (error) {
    console.error('Erro ao encontrar cursos lecionados atualmente para o utilizador:', error);
    throw error;
  }
}

async function getCursoCompletoComAulasEMaterial(id) {
    try {
        const curso = await cursos.findOne({
            where: { id_curso: id },
            attributes: [
                'id_curso',
                'nome_curso',
                'data_inicio_curso',
                'data_fim_curso',
                'data_inicio_inscricao',
                'data_fim_inscricao',
                'issincrono',
                'isassincrono',
                'horas_curso',
                'contador_formandos',
                'estado',
                'id_gestor_administrador',
                'imagem',
                'idioma',
                'descricao_curso',
            ],
            include: [
                {
                    model: ocorrencias_edicoes,
                    as: 'ocorrencias_edicos',
                },
                {
                    model: sincrono,
                    as: 'sincrono',
                    attributes: ['numero_vagas'],
                    include: [
                        {
                            model: formadores,
                            as: 'id_formador_formadore',
                            attributes: ['id_formador', 'descricao_formador'],
                            include: [
                                {
                                    model: utilizador,
                                    as: 'id_formador_utilizador',
                                    attributes: [
                                        [sequelize.col('id_utilizador'), 'id_util'],
                                        [sequelize.col('nome_utilizador'), 'nome_util']
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: gestor_administrador,
                    as: 'id_gestor_administrador_gestor_administrador',
                    include: [
                        {
                            model: utilizador,
                            as: 'id_gestor_administrador_utilizador',
                            attributes: ['nome_utilizador'],
                        }
                    ]
                },
                {
                    model: topico,
                    as: 'id_topico_topico',
                    attributes: ['id_topico', 'nome_topico'],
                    include: [
                        {
                            model: area,
                            as: 'id_area_area',
                            attributes: ['id_area', 'nome_area'],
                            include: [
                                {
                                    model: categoria,
                                    as: 'id_categoria_categorium',
                                    attributes: [
                                        [sequelize.col('id_categoria'), 'id_catego'],
                                        'nome_cat'
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!curso) {
            throw new Error("Curso não encontrado");
        }

        const aulasCurso = await aulas.findAll({
            where: { id_curso: id },
            include: [
                {
                    model: conteudos,
                    as: 'conteudos',
                    include: [
                        {
                            model: tipo_formato,
                            as: 'id_formato_tipo_formato',
                            attributes: ['id_formato', 'formato']
                        }
                    ],
                }
            ],
            order: [[sequelize.literal('"data_aula" IS NULL'), 'ASC'], ['data_aula', 'ASC'], ['id_aula', 'ASC']]
        });

        const materiaisApoio = await material_apoio.findAll({
            where: { id_curso: id },
            include: [
                {
                    model: tipo_formato,
                    as: 'id_formato_tipo_formato',
                    attributes: ['id_formato', 'formato']
                }
            ]
        });

        return {
            ...curso.toJSON(), 
            aulas: aulasCurso,
            material_apoio: materiaisApoio
        };

    } catch (error) {
        console.error('Erro ao obter curso completo:', error);
        throw error;
    }
}

async function clonarConteudoDeCurso({ idCursoAnterior, idCursoNovo, ignorarAulas = false }) {
  try {
    if (!ignorarAulas) {
      const aulasAnteriores = await aulas.findAll({
        where: { id_curso: idCursoAnterior },
        include: [
          {
            model: conteudos,
            as: "conteudos",
          }
        ]
      });

      for (const aula of aulasAnteriores) {
      
        let tempo_duracao_final = null;

        if (aula.caminho_url && isYoutubeLink(aula.caminho_url)) {
          try {
            const { hours, minutes, seconds } = await getVideoDuration(aula.caminho_url);
            tempo_duracao_final =
              `${String(hours).padStart(2, '0')}:` +
              `${String(minutes).padStart(2, '0')}:` +
              `${String(seconds).padStart(2, '0')}`;
          } catch (err) {
            console.warn(`Falha ao obter duração do vídeo de ${aula.nome_aula}: ${err.message}`);
          }
        }

        const novaAula = await aulas.create({
          id_curso: idCursoNovo,
          nome_aula: aula.nome_aula,
          data_aula: aula.data_aula,
          caminho_url: aula.caminho_url,
          tempo_duracao: tempo_duracao_final,
        });

        for (const conteudo of aula.conteudos || []) {
          await conteudos.create({
            id_aula: novaAula.id_aula,
            id_formato: conteudo.id_formato,
            nome_conteudo: conteudo.nome_conteudo,
            conteudo: conteudo.conteudo,
          });
        }
      }
    }
    
    const materiais = await material_apoio.findAll({
      where: { id_curso: idCursoAnterior },
    });

    for (const material of materiais) {
      await material_apoio.create({
        id_curso: idCursoNovo,
        id_formato: material.id_formato,
        nome_material: material.nome_material,
        conteudo: material.conteudo,
      });
    }
  } catch (error) {
    console.error("Erro ao clonar conteúdo do curso:", error);
    throw error;
  }
}

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
  getAllCoursesWithAllInfo,
  getCursoWithAllInfoOneCourse,
  verifyInscription,
  createCursoCompleto,
  updateCursoCompleto,
  getCursosLecionadosTerminadosService,
  getCursosLecionadosAtualmenteService,
  getCursoCompletoComAulasEMaterial,
  clonarConteudoDeCurso,
};