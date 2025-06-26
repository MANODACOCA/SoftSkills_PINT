//const model = require('../models/conteudos');;
const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).conteudos;
const controllers = {};

controllers.list = async (req,res)=>{
  const data = await model.findAll();
  res.status(200).json(data);
};

controllers.get = async (req,res)=>{
  try{
    const {id} = req.params;
    const data = await model.findByPk(id);
    if(data){
      res.status(200).json(data);
    }else{
      res.status(404).json({erro: 'conteudos nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar conteudos!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    const {id_aula, id_curso, nome_conteudo, id_formato, conteudo} = req.body;
    if(!id_aula || !nome_conteudo || !id_formato){
      return res.status(400).json({
        erro:'Campos obrigatorios em falta',
        desc: 'id_aula, nome_conteudo e id_formato são obrigatorios'
      });
    }

    const ficheiroRelativo = req.file
      ? req.file.path.replace(/^.*[\\/]uploads[\\/]/, '')
      : null;


    const ficheiroURL = ficheiroRelativo
      ? `${req.protocol}://${req.get('host')}/uploads/${ficheiroRelativo}`
      : null;

    if(!ficheiroURL && !conteudo) {
      return res.status(400).json({
        erro: 'Falta ficheiro ou URL',
        desc: 'Envie um ficheiro (campo "ficheiro") ou o campo "conteudo" com o link externo'
      });
    }

    const payload = {
      id_aula: Number(id_aula),
      id_formato: Number(id_formato),
      nome_conteudo,
      conteudo: ficheiroURL || conteudo
    };

      const data = await model.create(payload);
      res.status(201).json(data);
  }catch(err){
    if(err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        erro: 'Ficheiro execede o limite',
        desc: 'O ficheiro não pode ultrapassar 1 GB'
      });
    }

    res.status(500).json({erro: 'Erro ao criar conteudos!',desc: err.message});
  }
};

controllers.update = async (req,res)=>{
  try {
    if(req.body){
      const {id} = req.params;
      const updated = await model.update(req.body,{where:{id_conteudo:id}});
      if(updated){
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      }else{
        res.status(404).json({erro:'conteudos nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a conteudos!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a conteudos!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_conteudo:id}});
    if(deleted){
      res.status(200).json({msg:'conteudos apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'conteudos não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a conteudos!',desc: err.message});
  }
};

module.exports = controllers;
