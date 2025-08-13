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
    const {nome_topico, ...resto} = req.body;
    if(!nome_topico){
      return res.status(400).json({
        erro: 'Erro ao criar Topico',
        desc: 'Campo "nome" é obrigatorio'})
    }
   
    const existente = await model.findOne({ where : { nome_topico: nome_topico.trim() } });

    if (existente) {
      return res.status(409) .json({ erro: 'Já existe um tópico com esse nome.' });
    }
      const data = await model.create( {nome_topico: nome_topico.trim(), ...resto});
      res.status(201).json(data);
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Topico!',desc: err.message});
  }
};

controllers.update = async (req,res)=>{
  try {
    const { id } = req.params;
    const { nome_topico, ...resto} = req.body;
    if(!nome_topico){
      return res.status(400).json({
      erro: 'Erro ao criar Topico',
      desc: 'Campo "nome" é obrigatorio'})
    }

    /* const existente = await model.findOne({ nome_topico: nome_topico.trim() });
    
    if (existente) {
      return res.status(409).json({ erro: 'Já existe um topico com esse nome.' });
    } */

    await model.update({nome_topico: nome_topico.trim(), ...resto }, { where: { id_topico: id } });

    const modelUpdated = await model.findByPk(id);
    res.status(200).json(modelUpdated);
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Topico!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_topico: id}});
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

controllers.getCategoriaAreaTopicoRequired = async (req, res) => {
  try{
    const categoria_area_topico = await topicosService.getCategoriaAreaTopicoRequired();

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
