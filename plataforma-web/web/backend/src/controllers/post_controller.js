//const model = require('../models/post');;

const { where } = require("sequelize");
const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const { utilizador, likes_post, denuncia, comentario, likes_comentario } = require('../models/init-models')(sequelize);
const model = initModels(sequelize).post;
const controllers = {};
const fs = require('fs').promises;
const path = require('path');


controllers.list = async (req, res) => {
  const data = await model.findAll();
  res.status(200).json(data);
};

controllers.get = async (req, res) => {
  try {
    const ordenar = req.query.ordenar || 'Mais Recentes';
    const { id_conteudos_partilhado } = req.query;


    if (!id_conteudos_partilhado || !ordenar) {
      return res.status(400).json({ erro: 'Falta id_conteudos_partilhados na query.' });
    }

    let order = [];
    if (ordenar === "Mais Recentes") {
      order = [['data_criacao_post', 'DESC']];
    } else if (ordenar === "Mais Antigos") {
      order = [['data_criacao_post', 'ASC']];
    } else if (ordenar === "Mais Populares") {
      order = [['contador_likes_post', 'DESC']];
    } else {
      order = [['contador_likes_post', 'ASC']];
    }


    const data = await model.findAll({
      where: {
        id_conteudos_partilhado: id_conteudos_partilhado
      },
      include: [
        {
          model: utilizador,
          as: 'id_utilizador_utilizador'
        }
      ],
      order
    });

    if (data) {
      res.status(200).json({
        quatidadePosts: data.length,
        posts: data,
      });
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
      const { id_utilizador, id_conteudos_partilhado, id_formato, texto_post, caminho_ficheiro } = req.body;

      if (!id_utilizador || !id_conteudos_partilhado || !texto_post) {
        return res.status(400).json({
          erro: 'Campos obrigatórios em falta',
          desc: 'id_utilizador, id_conteudos_partilhado e texto_post são obrigatórios'
        });
      }

      const ficheiroRelativo = req.file
        ? req.file.path.replace(/^.*[\\/]uploads[\\/]/, '')
        : null;

      const ficheiroURL = ficheiroRelativo
        ? `${req.protocol}://${req.get('host')}/uploads/${ficheiroRelativo}`
        : null;

      const payload = {
        id_utilizador: Number(id_utilizador),
        id_conteudos_partilhado: Number(id_conteudos_partilhado),
        id_formato: Number(id_formato),
        texto_post,
        caminho_ficheiro: ficheiroURL || null,
        contador_likes_post: 0,
        contador_comentarios: 0
      };

      const data = await model.create(payload);
      res.status(201).json(data);
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
    const { id } = req.params;

    const post = await model.findByPk(id);
    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado!' });
    }

    const comentarios = await comentario.findAll({
      where: { id_post: id },
    });
    if (!comentarios) {
      return res.status(404).json({ erro: 'Comentário/s não encontrado!' });
    }


    if (post.caminho_ficheiro && post.caminho_ficheiro.includes('/uploads/')) {
      const ficheiroRelativo = post.caminho_ficheiro.replace(/^.*\/uploads\//, '');
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

    for (const c of comentarios) {
      if (c.caminho_ficheiro && c.caminho_ficheiro.includes('/uploads/')) {
        const ficheiroRelativo = c.caminho_ficheiro.replace(/^.*\/uploads\//, '');
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
    }


    await denuncia.destroy({ where: { id_post: id } });

    const idsComentarios = comentarios.map(c => c.id_comentario);
    await likes_comentario.destroy({ where: { id_comentario: idsComentarios } });
    
    await denuncia.destroy({ where: { id_comentario: idsComentarios } });

    await comentario.destroy({ where: { id_post: id } });

    await likes_post.destroy({ where: { id_post: id } });


    const deleted = await model.destroy({ where: { id_post: id } });
    if (deleted) {
      res.status(200).json({ msg: 'Post apagado/a com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Post não foi apagado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar o/a Post!', desc: err.message });
  }
};

//para dar like
controllers.putLike = async (req, res) => {
  try {

    const { id } = req.params;

    const post = await model.findByPk(id);
    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado!' });
    }

    const updated = await model.update(
      { contador_likes_post: post.contador_likes_post + 1 },
      { where: { id_post: id } }
    );

    if (updated) {
      const modelUpdated = await model.findByPk(id);
      res.status(200).json(modelUpdated);
    } else {
      res.status(404).json({ erro: 'Post nao foi atualizado/a!' });
    }

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar like do Post!', desc: err.message });
  }
};

//para retirar like
controllers.deleteLike = async (req, res) => {
  try {

    const { id } = req.params;

    const post = await model.findByPk(id);
    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado!' });
    }

    const updated = await model.update(
      { contador_likes_post: post.contador_likes_post - 1 },
      { where: { id_post: id } }
    );

    if (updated) {
      const modelUpdated = await model.findByPk(id);
      res.status(200).json(modelUpdated);
    } else {
      res.status(404).json({ erro: 'Post nao foi atualizado/a!' });
    }

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao eliminar like do Post!', desc: err.message });
  }
};

module.exports = controllers;
