const sequelize = require('../models/database');
const { ocorrencias_edicoes } = require('../models/init-models')(sequelize);

async function createNovaOcorrencia({ idCursoNovo, idCursoAnterior }) {
  try {
    let nrOcorrenciaNova = 1;
    let idCursoRaiz = idCursoNovo;

    if (idCursoAnterior) {
      const ocorrenciaAnterior = await ocorrencias_edicoes.findOne({
        where: { id_curso: idCursoAnterior },
        order: [['nr_ocorrencia', 'DESC']],
      });

      if (ocorrenciaAnterior) {
        nrOcorrenciaNova = ocorrenciaAnterior.nr_ocorrencia + 1;
        idCursoRaiz = ocorrenciaAnterior.id_curso_raiz;
      }
    }

    const novaOcorrencia = await ocorrencias_edicoes.create({
      id_curso: idCursoNovo,
      nr_ocorrencia: nrOcorrenciaNova,
      data_ult_ocorrencia: new Date(),
      id_curso_anterior: idCursoAnterior || null,
      id_curso_raiz: idCursoRaiz,
    });

    return novaOcorrencia;
  } catch (error) {
    console.error('Erro ao criar ocorrência de edições', error);
    throw error;
  }
}

module.exports = {
    createNovaOcorrencia,
}