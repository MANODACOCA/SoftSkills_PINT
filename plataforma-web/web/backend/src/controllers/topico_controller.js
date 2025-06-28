//const model = require('../models/topico');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).topico;
const controllers = {};
const topicosService = require('../services/topicos.service');


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
      res.status(404).json({erro: 'Topico nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Topico!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const data = await model.create(req.body);
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Topico!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Topico!',desc: err.message});
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
        res.status(404).json({erro:'Topico nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Topico!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Topico!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id:id}});
    if(deleted){
      res.status(200).json({msg:'Topico apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Topico não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Topico!',desc: err.message});
  }
};

/*------------------------------------------------------------------------------------------------------------*/

controllers.getCategoriaAreaTopico = async (req, res) => {
  try{
    const categoria_area_topico = await topicosService.getCategoriaAreaTopico();
    
    if(categoria_area_topico && categoria_area_topico.length > 0){
      res.status(200).json(categoria_area_topico);
    } else {
      res.status(404).json({ erro: 'Nenhuma Categoria/Area/Topico encontrado.'});
    }
  }catch(error){
    console.error('Erro ao procurar Categoria/Area/Topico.', error);
    res.status(500).json({ erro: 'Erro ao prcurar Categoria/Area/Topico.', desc: error.message});
  }
}

module.exports = controllers;
