//const model = require('../models/ocorrencias_edicoes');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).ocorrencias_edicoes;
const controllers = {};
const ocorrenciaService = require('../services/ocorrencias.service');


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
      res.status(404).json({erro: 'Ocorrencia de edicao nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Ocorrencia de edicao!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    const {id_curso} = req.body;

    if(!id_curso){
      return res.status(400).json({erro: 'Erro ao criar ocorrencia de edição', 
                                  desc: 'Campo "id_curso" é obrigatorio'});
    }

    const novaOcorrencia = await ocorrenciaService.createNovaOcorrencia(id_curso);

    res.status(201).json(novaOcorrencia);
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Ocorrencia de edicao!',desc: err.message});
  }
};

controllers.update = async (req,res)=>{
  try {
    if(req.body){
      const {id} = req.params;
      const updated = await model.update(req.body,{where:{id:id}});
      if(updated){
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      }else{
        res.status(404).json({erro:'Ocorrencia de edicao nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Ocorrencia de edicao!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Ocorrencia de edicao!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id:id}});
    if(deleted){
      res.status(200).json({msg:'Ocorrencia de edicao apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Ocorrencia de edicao não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Ocorrencia de edicao!',desc: err.message});
  }
};

module.exports = controllers;
