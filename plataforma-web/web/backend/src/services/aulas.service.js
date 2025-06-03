const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { inscricoes, aulas, material_apoio, conteudos, tipo_formato, cursos } = require('../models/init-models')(sequelize);
const { getEnrolledCoursesForUser } = require('./cursos.service');

//Vamos aos cursos inscritos para ir para a pagina de curso com aula ->  
// material_apoio/sobre(vem da getEnrolledCoursesForUser)
async function checkEnrollment(userId, cursoId) {
    try {
        if (!userId) {
            console.log('ID do utilizador não encontrado');
        }
        if (!cursoId) {
            console.log('Curso não encontrado');
        }

        const inscricaoUser = await inscricoes.findOne({
            where: {
                id_formando: userId,
                id_curso: cursoId,
                status_inscricao: 1
            }
        });

        const dadosCurso = await getEnrolledCoursesForUser(userId, null);
        const cursoTodosDados = dadosCurso.find(curso => curso.id_curso_curso?.id_curso === Number(cursoId));

        const todasAulas = await aulas.findAll({
            where: { id_curso: cursoId },
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
                    ]
                }
            ],
            order: [['id_aula', 'ASC']]
        });

        const primeiraAula = todasAulas.length > 0 ? todasAulas[0] : null;

        const material = await material_apoio.findAll({
            where: { id_curso: cursoId },
            include: [
                {
                    model: tipo_formato,
                    as: 'id_formato_tipo_formato',
                    attributes: ['id_formato', 'formato']
                }
            ]
        });


        return {
            inscrito: true,
            curso: cursoTodosDados?.id_curso_curso || null,
            primeiraAulaId: primeiraAula? primeiraAula.id_aula : null,
            aulas: todasAulas,
            materiaisApoios: material
        };

    } catch (error) {
        console.error('Erro ao tentar verificar inscrição:', error);
        throw error;
    }
}

module.exports = {
    checkEnrollment
};