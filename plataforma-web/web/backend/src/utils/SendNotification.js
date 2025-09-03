const { initModels } = require('../models/init-models');
const admin = require('../config/fireBaseConf.js');

module.exports.criarNotifacoesGenerica = async (
    tipo,
    versao,
    nome,
    id_curso,
    sequelize
) => {
    try {
        const { inscricoes, formandos, notificacoes_curso, devices_fcm } = initModels(sequelize);

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

        for (const ui of utilizadoresInscritos) {
            const devices = await devices_fcm.findAll({
                where: { id_utilizador: ui.id_formando, },

            });
            for (const device of devices) {
                if (device.token) {
                    const message = {
                        token: device.token,
                        notification: {
                            title: `Nova Notificação de ${tipo}`,
                            body: mensagem,
                        },
                        data: {
                            id_curso: id_curso.toString(),
                            route: '/cursos-inscritos',
                        }
                    };

                    admin.messaging().send(message)
                        .then(response => console.log('Notificação enviada:', response))
                        .catch(err => console.error('Erro ao enviar notificação:', err));
                }
            }

        }

        console.log(`Notificação enviada para ${notificacao.length} utilizadores`);
    } catch (error) {
        console.error('Erro ao criar notificação: ', error);
    }
}