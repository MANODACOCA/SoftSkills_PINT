//const model = require('../models/categoria');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).categoria;
const controllers = {};



controllers.list = async (req,res)=>{
  try{
    const data = await model.findAll();
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json({error: 'Erro ao procurar a lista de Categoria', desc: error.message});
  }
};

controllers.get = async (req,res)=>{
  try{
    const {id} = req.params;
    const data = await model.findByPk(id);
    if(data){
      res.status(200).json(data);
    }else{
      res.status(404).json({erro: 'Categoria nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Categoria!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const data = await model.create(req.body);
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Categoria!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Categoria!',desc: err.message});
  }
};

controllers.update = async (req,res)=>{
  try {
    if(req.body){
      const {id} = req.params;
      const updated = await model.update(req.body,{where:{id_categoria: id}});
      if(updated){
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      }else{
        res.status(404).json({erro:'Categoria nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Categoria!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Categoria!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id:id}});
    if(deleted){
      res.status(200).json({msg:'Categoria apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Categoria não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Categoria!',desc: err.message});
  }
};

module.exports = controllers;
