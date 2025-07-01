const { inscricoes, formandos, notificacoes_curso } = require('../models/init-models')(sequelize);

module.exports.criarNotifacoesGenerica = async (
    tipo,
    versao,
    nome,
    id_curso,
    sequelize
) => {
    try {

        const utilizadoresInscritos = await inscricoes.findAll({
            where: {id_curso},
            include: [
                {
                    model: formandos, 
                    as: 'id_formando_formando',
                }
            ]    
        });

        if (utilizadoresInscritos.length === 0) {
            return;
        }

        const mensagem = 'notificaçao teste';
        const data_hora_notificacaocurso = new Date();

        const notificacao = utilizadoresInscritos.map((ui) => ({
            id_utilizador: ui.id_formando,
            id_curso,
            data_hora_notificacaocurso,
            conteudo_notif_curso: mensagem
        }))

        await notificacoes_curso.bulkCreate(notificacao);

        console.log(`Notificação enviada para ${notificacao.length} utilizadores`);
    } catch (error) {
        console.error('Erro ao criar notificação: ', error);
    }
}