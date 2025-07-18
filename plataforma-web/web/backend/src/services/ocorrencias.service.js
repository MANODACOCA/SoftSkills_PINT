const sequelize = require('../models/database');
const { ocorrencias_edicoes } = require('../models/init-models')(sequelize);

async function createNovaOcorrencia(id_curso) {
    try{
        const ultimaOcorrencia = await ocorrencias_edicoes.findOne({
            where: { id_curso },
            order: [['nr_ocorrencia', 'DESC']],
        });

        const proximaOcorrencia = ultimaOcorrencia ? ultimaOcorrencia.nr_ocorrencia + 1 : 1;

        return await ocorrencias_edicoes.create({
            id_curso,
            nr_ocorrencia: proximaOcorrencia,
            data_ult_ocorrencia: new Date(),
        });
    }catch (error){
        console.error('Erro ao criar ocorrencia de edições', error);
        throw error;
    }
}

module.exports = {
    createNovaOcorrencia,
}