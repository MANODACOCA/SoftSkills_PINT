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
    const {nome_cat, ...resto} = req.body;
  if(!nome_cat){
    return res.status(400).json({
      erro: 'Erro ao criar Categoria',
      desc: 'Campo "nome" é obrigatorio'})
  }

  const existente = await model.findOne({ nome_cat: nome_cat.trim() });

  if (existente) {
    return res.status(409) .json({ erro: 'Já existe uma categoria com esse nome.' });
  }
    const data = await model.create( {nome_cat: nome_cat.trim(), ...resto});
    res.status(201).json(data);
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Categoria!',desc: err.message});
  }
};

controllers.update = async (req,res)=>{
  try {
    const { id } = req.params;
    const { nome_cat, ...resto} = req.body;
    if(!nome_cat){
      return res.status(400).json({
      erro: 'Erro ao criar Categoria',
      desc: 'Campo "nome" é obrigatorio'})
    }

    const existente = await model.findOne({ nome_cat: nome_cat.trim() });
    
    if (existente) {
      return res.status(409) .json({ erro: 'Já existe uma categoria com esse nome.' });
    }
    
    await model.update({ where: { id_categoria: id } }, { nome_cat: nome_cat.trim(), ...resto } );

    const modelUpdated = await model.findByPk(id);
    res.status(200).json(modelUpdated);
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Categoria!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_categoria: id}});
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
