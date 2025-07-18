const sequelize = require('../models/database');
const { ocorrencias_edicoes } = require('../models/init-models')(sequelize);

async function createNovaOcorrencia({idCursoNovo, idCursoAnterior}) {
    try{
        const ocorrenciaAnterior  = await ocorrencias_edicoes.findOne({
            where: { id_curso: idCursoAnterior },
            order: [['nr_ocorrencia', 'DESC']],
        });

        const nrOcorrenciaNova = ocorrenciaAnterior ? ocorrenciaAnterior.nr_ocorrencia + 1 : 1;

        const idCursoRaiz = ocorrenciaAnterior ? ocorrenciaAnterior.id_curso_raiz : idCursoNovo;

        const novaOcorrencia = await ocorrencias_edicoes.create({
            id_curso: idCursoNovo,
            nr_ocorrencia: nrOcorrenciaNova,
            data_ult_ocorrencia: new Date(),
            id_curso_anterior: ocorrenciaAnterior ? idCursoAnterior : null,
            id_curso_raiz: idCursoRaiz,
        });

        return novaOcorrencia;
    }catch (error){
        console.error('Erro ao criar ocorrencia de edições', error);
        throw error;
    }
}

module.exports = {
    createNovaOcorrencia,
}