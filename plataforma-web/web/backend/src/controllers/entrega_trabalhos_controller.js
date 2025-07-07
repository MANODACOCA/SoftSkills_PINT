const sequelize = require("../models/database");
const formandos = require("../models/formandos");
const initModels = require("../models/init-models");
const model = initModels(sequelize).entrega_trabalhos;
const controllers = {};
const fs = require('fs').promises;
const path = require('path');
const utilizador = require("../models/utilizador");


controllers.list = async (req, res) => {
  try {
    const { id_trabalho } = req.params;
    const data = await model.findAll({
      where: { id_trabalho_et: id_trabalho },
      include: [
        {
          model: formandos,
          as: 'id_formando_et_formando',
          include: [
            {
              model: utilizador,
              as: 'id_formando_utilizador',
              attributes: [
                [sequelize.col('id_utilizador'), 'id_util'],
                [sequelize.col('nome_utilizador'), 'nome_util'],
              ]
            }
          ]
        }
      ]
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao procurar entregas dos trabalhos!', desc: err.message });
  }
};

controllers.get = async (req, res) => {
  try {
    const { id_trabalho, id_formando } = req.params;
    const data = await model.findOne({
      where: {
        id_trabalho_et: id_trabalho,
        id_formando_et: id_formando,
      }
    });

    const jaEntregou = !!data;
    if (data) {
      res.status(200).json({ jaEntregou, data });
    } else {
      res.status(200).json({ jaEntregou: jaEntregou });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar entrega de trabalhos!', desc: err.message });
  }
};

controllers.create = async (req, res) => {
  try {
    if (req.body) {

      const { id_trabalho_et, id_formando_et, caminho_et } = req.body;

      if (!id_trabalho_et || !id_formando_et) {
        return res.status(400).json({
          erro: 'Campos obrigatórios em falta',
          desc: 'id_trabalho_et e id_formando_et são obrigatórios'
        });
      }

      const ficheiroRelativo = req.file
        ? req.file.path.replace(/^.*[\\/]uploads[\\/]/, '')
        : null;

      const ficheiroURL = ficheiroRelativo
        ? `${req.protocol}://${req.get('host')}/uploads/${ficheiroRelativo}`
        : null;

      if (!ficheiroURL && !caminho_et) {
        return res.status(400).json({
          erro: 'Falta ficheiro ou URL',
          desc: 'Envie um ficheiro (campo "ficheiro") ou o campo "conteudo" com o link externo'
        });
      }

      const payload = {
        id_trabalho_et: Number(id_trabalho_et),
        id_formando_et: Number(id_formando_et),
        caminho_et: ficheiroURL || caminho_et
      };

      const data = await model.create(payload);
      res.status(201).json(data);
    } else {
      res.status(400).json({ erro: 'Erro ao criar entrega de trabalhos!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        erro: 'Ficheiro excede o limite',
        desc: 'O ficheiro não pode ultrapassar 100 MB)'
      });
    }
    res.status(500).json({ erro: 'Erro ao criar entrega de trabalhos!', desc: err.message });
  }
};

controllers.update = async (req, res) => {
  try {
    if (req.body) {

      const { id_trabalho_et, id_formando_et, caminho_et } = req.body;

      if (!id_trabalho_et || !id_formando_et) {
        return res.status(400).json({
          erro: 'Campos obrigatórios em falta',
          desc: 'id_trabalho_et e id_formando_et são obrigatórios'
        });
      }


      /*       AQUI APAGAMOS O FICHEIRO ANTERIOR */
      const entregaTrab = await model.findOne({
        where:
        {
          id_trabalho_et: id_trabalho_et,
          id_formando_et: id_formando_et
        }
      });

      if (!entregaTrab) {
        return res.status(404).json({ erro: 'Entrega de trabalho não encontrada!' });
      }

      if (entregaTrab.caminho_et && entregaTrab.caminho_et.includes('/uploads/')) {
        const ficheiroRelativo = entregaTrab.caminho_et.replace(/^.*\/uploads\//, '');
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
      /*       AQUI APAGAMOS O FICHEIRO ANTERIOR */


      const ficheiroRelativo = req.file
        ? req.file.path.replace(/^.*[\\/]uploads[\\/]/, '')
        : null;

      const ficheiroURL = ficheiroRelativo
        ? `${req.protocol}://${req.get('host')}/uploads/${ficheiroRelativo}`
        : null;

      if (!ficheiroURL && !caminho_et) {
        return res.status(400).json({
          erro: 'Falta ficheiro ou URL',
          desc: 'Envie um ficheiro (campo "ficheiro") ou o campo "conteudo" com o link externo'
        });
      }

      const payload = {
        caminho_et: ficheiroURL || caminho_et
      };

      const updated = await model.update(payload,
        {
          where:
          {
            id_formando_et: id_formando_et,
            id_trabalho_et: id_trabalho_et
          }
        });

      if (updated) {
        const modelUpdated = await model.findOne({
          where:
          {
            id_formando_et: id_formando_et,
            id_trabalho_et: id_trabalho_et
          }
        });
        res.status(200).json(modelUpdated);
      } else {
        res.status(404).json({ erro: 'Entrega de trabalhos nao foi atualizado/a!' });
      }
    } else {
      res.status(400).json({ erro: 'Erro ao atualizar o/a entrega de trabalhos!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status
    }
    res.status(500).json({ erro: 'Erro ao atualizar o/a entrega de trabalhos!', desc: err.message });
  }
};

controllers.delete = async (req, res) => {
  try {
    const { id_trabalho, id_formando } = req.params;


    /*       AQUI APAGAMOS O FICHEIRO ANTERIOR */
    const entregaTrab = await model.findOne({
      where:
      {
        id_trabalho_et: id_trabalho,
        id_formando_et: id_formando
      }
    });

    if (!entregaTrab) {
      return res.status(404).json({ erro: 'Entrega de trabalho não encontrada!' });
    }

    if (entregaTrab.caminho_et && entregaTrab.caminho_et.includes('/uploads/')) {
      const ficheiroRelativo = entregaTrab.caminho_et.replace(/^.*\/uploads\//, '');
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
    /*       AQUI APAGAMOS O FICHEIRO ANTERIOR */

    const deleted = await model.destroy({
      where:
      {
        id_trabalho_et: id_trabalho,
        id_formando_et: id_formando
      }
    });
    if (deleted) {
      res.status(200).json({ msg: 'Entrega de trabalhos apagado/a com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Entrega de trabalhos não foi apagado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar o/a entrega de trabalhos!', desc: err.message });
  }
};

module.exports = controllers;
