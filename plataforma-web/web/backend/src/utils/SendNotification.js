const { initModels } = require('../models/init-models');

module.exports.criarNotifacoesGenerica = async (
    tipo,
    versao,
    nome,
    id_curso,
    sequelize
) => {
    try {
        const { inscricoes, formandos, notificacoes_curso } = initModels(sequelize);

        const utilizadoresInscritos = await inscricoes.findAll({
            where: { id_curso },
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

        let mensagem;
        const artigo1 = tipo.toLowerCase() === 'aula' ? 'A' : 'O';
        const artigo2 = tipo.toLowerCase() === 'aula' ? 'da' : 'do';

        if (versao === 'criação') {
            mensagem = `✅ ${artigo1} ${tipo.toLowerCase()} foi criad${artigo1.toLowerCase()} com sucesso! O conteúdo já está disponível para consulta.`;
        } else {
            mensagem = `🔄 A atualização ${artigo2} ${tipo.toLowerCase()} foi concluída com sucesso! O conteúdo já se encontra disponível para consulta.`;
        }

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