//const model = require('../models/notificacoes_comentarios_post');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).notificacoes_comentarios_post;
const controllers = {};
const { getNotificationOfComentariosPost } = require("../services/notificacoes_comentarios_post.service");


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
      res.status(404).json({erro: 'Notificacoes Comentarios Post nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Notificacoes Comentarios Post!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const data = await model.create(req.body);
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Notificacoes Comentarios Post!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Notificacoes Comentarios Post!',desc: err.message});
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
        res.status(404).json({erro:'Notificacoes Comentarios Post nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Notificacoes Comentarios Post!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Notificacoes Comentarios Post!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id:id}});
    if(deleted){
      res.status(200).json({msg:'Notificacoes Comentarios Post apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Notificacoes Comentarios Post não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Notificacoes Comentarios Post!',desc: err.message});
  }
};

controllers.getComentarioPostNotificationsController = async (req,res)=>{
  try {
    const post = await getNotificationOfComentariosPost();
    res.status(200).json(post); 
  } catch(error) {
    res.status(500).json({erro:'Erro ao obter notificaçao'});
  }
}


module.exports = controllers;
