const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).conteudos_partilhado;
const controllers = {};
const { utilizador, pedidos_novos_foruns, topico } = require('../models/init-models')(sequelize);

const conteudoPartilhadoService = require('../services/conteudo_partilhado.service');
const { enviarEmailForumAprovado } = require("../utils/enviarEmail");


controllers.list = async (req, res) => {
  try {
    const ordernar = req.query.ordenar || "Mais Recentes";
    const search = req.query.search || "";
    const data = await conteudoPartilhadoService.getForuns(ordernar, search);

    if (data && data.length > 0) {
      res.status(200).json(data);
    }

  } catch (error) {
    console.error('Erro ao procurar cursos disponiveis:', error);
    res.status(500).json({
      erro: 'Erro ao procurar conteudos partilhados.',
      desc: error.message
    });
  }
};

controllers.get = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ erro: 'Conteudo Partilhado nao encontrado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar Conteudo Partilhado!', desc: err.message });
  }
};

controllers.create = async (req, res) => {
  try {
    if (req.body) {
      const { id_topico, data_criacao_cp, id_pedido } = req.body;
      const data = await model.create({id_topico, data_criacao_cp});

      if(id_pedido) {
        const pedido = await pedidos_novos_foruns.findOne({where: {id_pedidos_novos_foruns: id_pedido}});
        const user = await utilizador.findOne({where: {id_utilizador: pedido.id_formando}});
        const top = await topico.findOne({where: {id_topico: id_topico}});
        if (user?.email) {
          await enviarEmailForumAprovado(user.email, top.nome_topico);
        }
        await pedido.destroy();
      }
      res.status(201).json(data);
    } else {
      res.status(400).json({ erro: 'Erro ao criar Conteudo Partilhado!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar Conteudo Partilhado!', desc: err.message });
  }
};

controllers.update = async (req, res) => {
  try {
    if (req.body) {
      const { id } = req.params;
      const updated = await model.update(req.body, { where: { id: id } });
      if (updated) {
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      } else {
        res.status(404).json({ erro: 'Conteudo Partilhado nao foi atualizado/a!' });
      }
    } else {
      res.status(400).json({ erro: 'Erro ao atualizar o/a Conteudo Partilhado!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o/a Conteudo Partilhado!', desc: err.message });
  }
};

controllers.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await model.destroy({ where: { id: id } });
    if (deleted) {
      res.status(200).json({ msg: 'Conteudo Partilhado apagado/a com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Conteudo Partilhado não foi apagado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar o/a Conteudo Partilhado!', desc: err.message });
  }
};

/*------------------------------------------------------------------------------------------------------------*/

controllers.countForum = async (req, res) => {
  try {
    const total = await model.count();
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json('Erro ao contar Foruns');
  }
}

module.exports = controllers;
