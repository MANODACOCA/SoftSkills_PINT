
const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { inscricoes, aulas, material_apoio, conteudos, tipo_formato, cursos } = require('../models/init-models')(sequelize);


async function checkInscricao(userId, cursoId){
    try{
        if (!userId) {
            throw new Error('ID do utilizador não encontrado');
        }
        if (!cursoId) {
            throw new Error('Curso não encontrado');
        }

        const inscricaoUsuario = await inscricoes.findOne({
            where: { 
                id_formando: userId,
                id_curso: cursoId,
                status_inscricao: 1 
            }
        });

        return {
            inscrito: !!inscricaoUsuario,
            mensagem: inscricaoUsuario 
                ? 'Utilizador está inscrito neste curso' 
                : 'Utilizador não está inscrito neste curso'
        };
    } catch(error) {
        console.error('Erro ao verificar inscrição:', error);
        throw error;
    }
}


module.exports = {
    checkInscricao
};