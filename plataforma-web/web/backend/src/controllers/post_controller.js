//const model = require('../models/post');;

const { where } = require("sequelize");
const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).post;
const controllers = {};


controllers.list = async (req, res) => {
  const data = await model.findAll();
  res.status(200).json(data);
};

controllers.get = async (req, res) => {
  try {
    const { id_conteudos_partilhado } = req.query;

    if (!id_conteudos_partilhado) {
      return res.status(400).json({ erro: 'Falta id_conteudos_partilhados na query.' });
    }

    const data = await model.findAll({
      where: {
        id_conteudos_partilhado: id_conteudos_partilhado
      }
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ erro: 'Posts nao encontrados!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar Posts!', desc: err.message });
  }
};

controllers.create = async (req, res) => {
  try {
    if (req.body) {
      const { texto_post, id_utilizador, id_conteudos_partilhado } = req.body;

      const data = await model.create({
        texto_post,
        id_utilizador,
        id_conteudos_partilhado,
        contador_likes_post: 0,
        contador_comentarios: 0
      });

      res.status(201).json({
        message: 'Post criado com sucesso!',
        post: data,
      });
    } else {
      res.status(400).json({ erro: 'Erro ao criar Post!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar Post!', desc: err.message });
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
        res.status(404).json({ erro: 'Post nao foi atualizado/a!' });
      }
    } else {
      res.status(400).json({ erro: 'Erro ao atualizar o/a Post!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o/a Post!', desc: err.message });
  }
};

controllers.delete = async (req, res) => {
  try {
    const { id_post } = req.params;
    const deleted = await model.destroy({ where: { id_post: id_post } });
    if (deleted) {
      res.status(200).json({ msg: 'Post apagado/a com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Post não foi apagado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar o/a Post!', desc: err.message });
  }
};

module.exports = controllers;
