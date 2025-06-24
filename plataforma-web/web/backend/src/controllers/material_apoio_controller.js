//const model = require('../models/material_apoio');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).material_apoio;
const controllers = {};
const materialApoio = require('../services/material_apoio.service');


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
      res.status(404).json({erro: 'Material de Apoio nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Material de Apoio!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const data = await model.create(req.body);
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Material de Apoio!', error});
    }
  }catch(error){
    res.status(500).json({erro: 'Erro ao criar Material de Apoio!', error});
  }
};

controllers.update = async (req,res)=>{
  try {
    if(req.body){
      const {id} = req.params;
      const updated = await model.update(req.body,{where:{id_material_apoio:id}});
      if(updated){
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      }else{
        res.status(404).json({erro:'Material de Apoio nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Material de Apoio!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(error){
    console.log('Erro ao atualizar o/a Material de Apoio!', error);
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_material_apoio:id}});
    if(deleted){
      res.status(200).json({msg:'Material de Apoio apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Material de Apoio não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Material de Apoio!',desc: err.message});
  }
};


controllers.getMaterial_Apoio = async (req, res) => {
  try{
    const {cursoID} = req.params;
    const data = await materialApoio.getMaterialApoioDoCurso(cursoID);
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao carregar material apoio:', error);
    res.status(500).json({
      erro: 'Erro ao carregar material apoio',
      desc: error.message,
    })
  }
}




module.exports = controllers;
