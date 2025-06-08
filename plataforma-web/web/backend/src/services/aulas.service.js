const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { inscricoes, aulas, material_apoio, conteudos, tipo_formato, cursos } = require('../models/init-models')(sequelize);
const { getEnrolledCoursesForUser } = require('./cursos.service');

//Vamos aos cursos inscritos para ir para a pagina de curso com aula ->  
// material_apoio/sobre(vem da getEnrolledCoursesForUser)
async function getClassByCurso(userId, cursoId) {
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
        
        const todasAulas = await aulas.findAll({
            where: {id_curso: cursoId},
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
        
        if (todasAulas.length === 0) {
            throw new Error('Nenhum aula encontrada para este curso');
        }
       

        const dadosCurso = await getEnrolledCoursesForUser(userId, null);
        const curso = dadosCurso.find(c => c.id_curso_curso?.id_curso === Number(cursoId));
        
        const materialApoio = await material_apoio.findAll({
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
            curso: curso?.id_curso_curso || null,
            todasAulas,
            materialApoio
        };
    } catch (error) {
        console.error('Erro ao buscar detalhes da aula:', error);
        throw error;
    }
}

module.exports = {
    getClassByCurso
};

