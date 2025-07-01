const sequelize = require('../models/database');
const { utilizador, formandos, resultados } = require('../models/init-models')(sequelize);

async function getResultadosFormandos(cursoId){
    try{
        const resultadosFinais = await resultados.findAll({
            where: {id_curso_sincrono : cursoId},
                include: [
                    {
                        model: formandos,
                        as: 'id_formando_formando',
                        attributes: ['id_formando'],
                        include: [
                            {
                                model: utilizador,
                                as: 'id_formando_utilizador',
                                attributes: [
                                    [sequelize.col('id_utilizador'), 'id_util'],
                                    [sequelize.col('nome_utilizador'), 'nome_util']
                                ],
                            }
                        ]   
                    }
                ],
                order: [[
                    { model: formandos, as: 'id_formando_formando'},
                    { model: utilizador, as: 'id_formando_utilizador'},
                    'nome_utilizador']]    
            });

        return resultadosFinais;
    } catch(error) {
        console.error('Erro ao buscar resultados', error);
        throw error;
    }
}

module.exports = {
    getResultadosFormandos
}; 