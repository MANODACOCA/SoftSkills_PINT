//const model = require('../models/resultados');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).resultados;
const controllers = {};
const resultadosServices = require('../services/resultados.service');


controllers.list = async (req,res)=>{
  try{
    const {id} = req.params;
    const data = await model.findAll({id});
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({erro: 'Erro ao procurar Resultados!',desc: err.message});
  }
};

controllers.get = async (req,res)=>{
  try{
    const {id} = req.params;
    const data = await resultadosServices.getResultadosFormandos(id);
    //const data = await model.findByPk(id);
      res.status(200).json(data);
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Resultados!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const data = await model.create(req.body);
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Resultado!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Resultado!',desc: err.message});
  }
};

controllers.update = async (req,res)=>{
  try {
    if(req.body){
      const {id} = req.params;
      const updated = await model.update(req.body,{where:{id_resul: id}});
      if(updated){
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      }else{
        res.status(404).json({erro:'Resultado nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Resultado!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Resultado!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_resul :id}});
    if(deleted){
      res.status(200).json({msg:'Resultado apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Resultado não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Resultado!',desc: err.message});
  }
};


module.exports = controllers;
