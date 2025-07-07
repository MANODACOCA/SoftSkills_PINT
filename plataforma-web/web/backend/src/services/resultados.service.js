const sequelize = require('../models/database');
const { utilizador, formandos, resultados, inscricoes } = require('../models/init-models')(sequelize);

async function getResultadosFormandosInscritos(cursoId) {
    try {
        const InscritosComResultadosFinais = await inscricoes.findAll({
            where: { id_curso: cursoId },
            include: [
                {
                    model: formandos,
                    as: 'id_formando_formando',
                    attributes: ['id_formando'],
                    include: [
                        {
                            model: resultados,
                            as: 'resultados',
                        },
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
                { model: formandos, as: 'id_formando_formando' },
                { model: utilizador, as: 'id_formando_utilizador' },
                'nome_utilizador']]
        });

        return InscritosComResultadosFinais;
    } catch (error) {
        console.error('Erro ao buscar resultados', error);
        throw error;
    }
}

module.exports = {
    getResultadosFormandosInscritos
}; 