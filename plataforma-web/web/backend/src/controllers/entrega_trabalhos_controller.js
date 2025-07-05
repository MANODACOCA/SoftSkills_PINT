const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).entrega_trabalhos;
const controllers = {};


controllers.list = async (req, res) => {
  const data = await model.findAll();
  res.status(200).json(data);
};

controllers.get = async (req, res) => {
  try {
    const { id_trabalho, id_formando } = req.params;
    const data = await model.findOne({
      where: {
        id_trabalho_et: id_trabalho,
        id_formando: id_formando,
      }
    });

    if (data) {
      const jaEntregou = !!data;
      res.status(200).json(jaEntregou);
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar entrega de trabalhos!', desc: err.message });
  }
};

controllers.create = async (req, res) => {
  try {
    if (req.body) {

      const { id_trabalho_et, id_formando_et, id_formato_et, nome_et, caminho_et } = req.body;

      if (!id_trabalho_et || !id_formando_et || !id_formato_et || !nome_et || !caminho_et) {
        return res.status(400).json({
          erro: 'Campos obrigatórios em falta',
          desc: 'id_trabalho_et, id_formando_et, id_formato_et, nome_et e caminho_et são obrigatórios'
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
        id_formato_et: Number(id_formato_et),
        nome_et,
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
    res.status(500).json({ erro: 'Erro ao criar material de apoio!', desc: err.message });
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
        res.status(404).json({ erro: 'Entrega de trabalhos nao foi atualizado/a!' });
      }
    } else {
      res.status(400).json({ erro: 'Erro ao atualizar o/a entrega de trabalhos!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o/a entrega de trabalhos!', desc: err.message });
  }
};

controllers.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await model.destroy({ where: { id: id } });
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
