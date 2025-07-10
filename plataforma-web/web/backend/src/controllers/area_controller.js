//const model = require('../models/area');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).area;
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
      res.status(404).json({erro: 'Area nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Area!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    const { nome_area, ...resto} = req.body;
    if(!nome_area){
      return res.status(400).json({
        erro: 'Erro ao criar Área',
        desc: 'Campo "nome" é obrigatorio'})
    }

    const existente = await model.findOne({ where: { nome_area: nome_area.trim() }});

    if (existente) {
      return res.status(409) .json({ erro: 'Já existe uma area com esse nome.' });
    }
      const data = await model.create( {nome_area: nome_area.trim(), ...resto});
      res.status(201).json(data);
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Area!',desc: err.message});
  }
};

controllers.update = async (req,res)=>{
  try {
    const { id } = req.params;
    const { nome_area, ...resto} = req.body;
    if(!nome_area){
      return res.status(400).json({
      erro: 'Erro ao criar Área',
      desc: 'Campo "nome" é obrigatorio'})
    }

    /* const existente = await model.findOne({ nome_area: nome_area.trim() });
    
    if (existente) {
      return res.status(409).json({ erro: 'Já existe uma area com esse nome.' });
    } */
    
    await model.update({ where: { id_area: id } }, { nome_area: nome_area.trim(), ...resto } );

    const modelUpdated = await model.findByPk(id);
    res.status(200).json(modelUpdated);   
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Area!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_area: id}});
    if(deleted){
      res.status(200).json({msg:'Area apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Area não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Area!',desc: err.message});
  }
};

module.exports = controllers;
