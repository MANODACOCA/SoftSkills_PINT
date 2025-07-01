//const model = require('../models/aulas');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).aulas;
const controllers = {};
const aulasService = require('../services/aulas.service');
const { criarNotifacoesGenerica } = require("../utils/SendNotification");
const { getVideoDuration } = require('../utils/youtube_aulas');
const isYouTube = url => /^(https:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/i.test(url);

controllers.list = async (req, res) => {
  const data = await model.findAll();
  res.status(200).json(data);
};

controllers.get = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ erro: 'Aula nao encontrado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar Aula!', desc: err.message });
  }
};

controllers.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ erro: 'Erro ao criar Aula!', desc: 'Corpo do pedido está vazio.' });
    } 
    
    const { tempo_duracao, caminho_url } = req.body;

    if (tempo_duracao) {
        const rx = /^\d{2}:\d{2}:\d{2}$/;          
      if (!rx.test(tempo_duracao)) {
        return res.status(400).json({erro: 'Formato de tempo_duracao inválido!', desc: 'Use hh:mm:ss — ex. 00:45:00'});
      }
    } else if (caminho_url && isYouTube(caminho_url)) {
      try {
        const { hours, minutes, seconds } = await getVideoDuration(caminho_url);
        req.body.tempo_duracao =
          `${String(hours).padStart(2, '0')}:` +
          `${String(minutes).padStart(2, '0')}:` +
          `${String(seconds).padStart(2, '0')}`;
      } catch (err) {
        return res.status(400).json({ erro: 'Não consegui obter a duração do vídeo.', desc: err.message });
      }
    } else {
      req.body.tempo_duracao = null;
    }

    const data = await model.create(req.body);

    try {
      await criarNotifacoesGenerica(
        'aula',
        'criada',
        req.body.nome_aula,
        req.body.id_curso,
        sequelize
      );
    } catch (error) {
      console.error('Erro ao enviar notificação de criação de aula');
    }

    return res.status(201).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar Aula!', desc: err.message });
  }
};

controllers.update = async (req, res) => {
  try {
    if (req.body) {
      const { id } = req.params;
      
    if (req.body.tempo_duracao) {
      const rx = /^\d{2}:\d{2}:\d{2}$/;           
      if (!rx.test(req.body.tempo_duracao)) {
        return res.status(400).json({
          erro: 'Formato de tempo_duracao inválido!',
          desc: 'Use hh:mm:ss — ex. 00:45:00'
        });
      }
    }

    else if (req.body.caminho_url && isYouTube(req.body.caminho_url)) {
      try {
        const { hours, minutes, seconds } = await getVideoDuration(req.body.caminho_url);
        req.body.tempo_duracao =
          `${String(hours).padStart(2, '0')}:` +
          `${String(minutes).padStart(2, '0')}:` +
          `${String(seconds).padStart(2, '0')}`;
      } catch (err) {
        return res.status(400).json({ erro: 'Não consegui obter a duração do vídeo.', desc: err.message });
      }
    }

    else {
      req.body.tempo_duracao = req.body.tempo_duracao || null;
    }
      const updated = await model.update(req.body, { where: { id_aula : id } });
      if (updated) {
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      } else {
        res.status(404).json({ erro: 'Aula nao foi atualizado/a!' });
      }
    } else {
      res.status(400).json({ erro: 'Erro ao atualizar o/a Aula!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o/a Aula!', desc: err.message });
  }
};

controllers.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await model.destroy({ where: { id_aula: id } });
    if (deleted) {
      res.status(200).json({ msg: 'Aula apagado/a com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Aula não foi apagado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar o/a Aula!', desc: err.message });
  }
};

controllers.getAulasAndMateriaApoioForCurso = async (req, res) => {
  try {
    const { cursoId } = req.params;

    const data = await aulasService.getAulasAndMateriaApoioForCurso(cursoId);
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao verificar aulas e material da apoio:', error);
    res.status(500).json({
      erro: 'Erro ao verificar aulas e material de apoio',
      desc: error.message,
    })
  }
};

controllers.getAulasCurso = async (req, res) => {
  try{
    const {cursoID} = req.params;
    const data = await aulasService.getAulas(cursoID);
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao carregar aulas:', error);
    res.status(500).json({
      erro: 'Erro ao carregar aulas',
      desc: error.message,
    })
  }
}

module.exports = controllers;
