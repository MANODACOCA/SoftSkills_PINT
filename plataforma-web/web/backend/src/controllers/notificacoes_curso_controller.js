
const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).notificacoes_curso;
const controllers = {};
const { getNotificationOfCourse, countNotificationOfUser } = require("../services/notificacoes_course.service");

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
      res.status(404).json({erro: 'Notificacao de Curso nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Notificacao de Curso!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const data = await model.create(req.body);
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Notificacao de Curso!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Notificacao de Curso!',desc: err.message});
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
        res.status(404).json({erro:'Notificacao de Curso nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Notificacao de Curso!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Notificacao de Curso!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_notificacao_cursos: id}});
    if(deleted){
      res.status(200).json({msg:'Notificacao de Curso apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Notificacao de Curso não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Notificacao de Curso!',desc: err.message});
  }
};


controllers.getCursoNotificationsController = async (req,res)=>{
  try {
    const {userID} = req.params;
    const {order} = req.query;
    const cursos = await getNotificationOfCourse(userID, order);
    res.status(200).json(cursos); 
  } catch(error) {
    res.status(500).json({erro:'Erro ao obter notificaçao'});
  }
}

controllers.getUtilizadorCountNotificationsController = async (req,res)=>{
  try {
    const {userID} = req.params;
     const count = await countNotificationOfUser(userID);
     res.status(200).json(count); 
  } catch(error) {
    res.status(500).json({erro:'Erro ao obter count de notificaoes'});
  }
}

module.exports = controllers;
