//const model = require('../models/inscricoes');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).inscricoes;
const { enviarEmailConfirmacaoInscricao } = require("../utils/enviarEmail");
const controllers = {};

controllers.list = async (req, res) => {
  const data = await model.findAll();
  res.status(200).json(data);
};

controllers.get = async (req, res) => {
  try {
    const { id_formando, id_curso } = req.query;

    const data = await model.findOne({
      where: {
        id_formando,
        id_curso
      }
    });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(200).json(null);//sem inscricao
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar Inscricoes!', desc: err.message });
  }
};

controllers.create = async (req, res) => {
  try {
    if (req.body) {
      const {id_formando, id_curso, nome_formando, destinatario, nome_curso, data_inicio } = req.body;
      const data = await model.create({id_formando, id_curso});
      if(data){
        enviarEmailConfirmacaoInscricao(nome_formando, destinatario, nome_curso, data_inicio);
      }
      res.status(201).json(data);
    } else {
      res.status(400).json({ erro: 'Erro ao criar Inscricoes!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar Inscricoes!', desc: err.message });
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
        res.status(404).json({ erro: 'Inscricoes nao foi atualizado/a!' });
      }
    } else {
      res.status(400).json({ erro: 'Erro ao atualizar o/a Inscricoes!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o/a Inscricoes!', desc: err.message });
  }
};

controllers.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await model.destroy({ where: { id: id } });
    if (deleted) {
      res.status(200).json({ msg: 'Inscricoes apagado/a com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Inscricoes não foi apagado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar o/a Inscricoes!', desc: err.message });
  }
};


module.exports = controllers;
