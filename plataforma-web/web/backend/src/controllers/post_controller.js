//const model = require('../models/post');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).post;
const controllers = {};
const { getCommentsByPost, getConteudosByPost } = require('../services/post.service');


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
      res.status(404).json({erro: 'Post nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Post!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const data = await model.create(req.body);
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Post!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Post!',desc: err.message});
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
        res.status(404).json({erro:'Post nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Post!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Post!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id:id}});
    if(deleted){
      res.status(200).json({msg:'Post apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Post não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Post!',desc: err.message});
  }
};

controllers.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    
    // Validação básica do ID
    if (!postId || isNaN(postId)) {
      return res.status(400).json({
        success: false,
        message: 'ID do post inválido'
      });
    }

    const comments = await getCommentsByPost(parseInt(postId));
    
    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    console.error('Erro no controller getCommentsByPost:', error);
    
    const statusCode = error.message.includes('não encontrado') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

controllers.getConteudosByPost = async (req, res) => {
        try {
            const {postId} = req.params;
            
            if (!postId || isNaN(postId)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do post inválido'
                });
            }

            const conteudos = await getConteudosByPost(parseInt(postId));
            
            res.json({
                success: true,
                data: conteudos
            });
        } catch (error) {
            console.error('Erro no controller getByPost:', error);
            
            const statusCode = error.message.includes('não encontrado') ? 404 : 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
};

module.exports = controllers;
