//const model = require('../models/comentario');;

const comentario = require("../models/comentario");
const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const { utilizador, post, likes_comentario, denuncia } = require('../models/init-models')(sequelize);
const model = initModels(sequelize).comentario;
const controllers = {};
const fs = require('fs').promises;
const path = require('path');


controllers.list = async (req, res) => {
  const data = await model.findAll();
  res.status(200).json(data);
};

controllers.get = async (req, res) => {
  try {
    const { id_post } = req.query;

    if (!id_post) {
      return res.status(400).json({ erro: 'Falta id_post na query.' });
    }

    const data = await model.findAll({
      where: {
        id_post: id_post
      },
      include: [
        {
          model: utilizador,
          as: 'id_utilizador_utilizador'
        }
      ],
      order: [['data_criacao_comentario', 'DESC']]
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ erro: 'Comentario nao encontrado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar Comentario!', desc: err.message });
  }
};

controllers.create = async (req, res) => {
  try {
    if (req.body) {
      const { id_post, id_utilizador, id_formato, texto_comentario, caminho_ficheiro } = req.body;

      if (!id_post || !id_utilizador || !texto_comentario) {
        return res.status(400).json({
          erro: 'Campos obrigatórios em falta',
          desc: 'id_post, id_utilizador e texto_comentario são obrigatórios'
        });
      }

      const ficheiroRelativo = req.file
        ? req.file.path.replace(/^.*[\\/]uploads[\\/]/, '')
        : null;

      const ficheiroURL = ficheiroRelativo
        ? `${req.protocol}://${req.get('host')}/uploads/${ficheiroRelativo}`
        : null;

      const payload = {
        id_post: Number(id_post),
        id_utilizador: Number(id_utilizador),
        id_formato: Number(id_formato),
        texto_comentario,
        caminho_ficheiro: ficheiroURL || null,
        contador_likes_com: 0,
      };

      const data = await model.create(payload);

      await post.increment('contador_comentarios', { by: 1, where: { id_post } });//vai adiconar mais um a tabela post ao conatdor de comentarios

      res.status(201).json(data);
    } else {
      res.status(400).json({ erro: 'Erro ao criar Comentario!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar Comentario!', desc: err.message });
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
        res.status(404).json({ erro: 'Comentario nao foi atualizado/a!' });
      }
    } else {
      res.status(400).json({ erro: 'Erro ao atualizar o/a Comentario!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o/a Comentario!', desc: err.message });
  }
};

controllers.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const comentario = await model.findByPk(id);
    if (!comentario) {
      return res.status(404).json({ erro: 'Comentario não encontrado!' });
    }

    if (comentario.caminho_ficheiro && comentario.caminho_ficheiro.includes('/uploads/')) {
      const ficheiroRelativo = comentario.caminho_ficheiro.replace(/^.*\/uploads\//, '');
      const ficheiroPath = path.join(__dirname, '..', 'uploads', ficheiroRelativo);

      if (!ficheiroPath.startsWith(path.join(__dirname, '..', 'uploads'))) {
        throw new Error('Ficheiro fora da pasta uploads!');
      }

      try {
        await fs.unlink(ficheiroPath);
        console.log(`Ficheiro removido: ${ficheiroPath}`);
      } catch (err) {
        console.warn(`Ficheiro não pôde ser apagado: ${ficheiroPath}`, err.message);
      }
    }

    const postAtual = await post.findByPk(comentario.id_post);
    if (postAtual) {
      const novoContador = postAtual.contador_comentarios - 1;
      await post.update(
        { contador_comentarios: novoContador < 0 ? 0 : novoContador },
        { where: { id_post: comentario.id_post } }
      );
    }

    await denuncia.destroy({ where: { id_comentario: id } });

    await likes_comentario.destroy({ where: { id_comentario: id } });

    const deleted = await model.destroy({ where: { id_comentario: id } });
    if (deleted) {
      res.status(200).json({ msg: 'Comentario apagado/a com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Comentario não foi apagado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar o/a Comentario!', desc: err.message });
  }
};


//para dar like
controllers.putLike = async (req, res) => {
  try {

    const { id } = req.params;

    const comentario = await model.findByPk(id);
    if (!comentario) {
      return res.status(404).json({ erro: 'Comentário não encontrado!' });
    }

    const updated = await model.update(
      { contador_likes_com: comentario.contador_likes_com + 1 },
      { where: { id_comentario: id } }
    );

    if (updated) {
      const modelUpdated = await model.findByPk(id);
      res.status(200).json(modelUpdated);
    } else {
      res.status(404).json({ erro: 'Comentário nao foi atualizado/a!' });
    }

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar like do Comentário!', desc: err.message });
  }
};

//para retirar like
controllers.deleteLike = async (req, res) => {
  try {

    const { id } = req.params;

    const comentario = await model.findByPk(id);
    if (!comentario) {
      return res.status(404).json({ erro: 'Comentário não encontrado!' });
    }

    const updated = await model.update(
      { contador_likes_com: comentario.contador_likes_com - 1 },
      { where: { id_comentario: id } }
    );

    if (updated) {
      const modelUpdated = await model.findByPk(id);
      res.status(200).json(modelUpdated);
    } else {
      res.status(404).json({ erro: 'Comentário nao foi atualizado/a!' });
    }

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar like do Comentário!', desc: err.message });
  }
};

module.exports = controllers;
