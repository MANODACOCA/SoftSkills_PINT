//const model = require('../models/post');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).post;
const controllers = {};
const handleLike = require('../services/post.service');


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

controllers.handleLike = async (req, res) => {
    try {
      const { postId } = req.params;
      
      // Encontra o post pelo ID
      const post = await Post.findByPk(postId);
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post não encontrado'
        });
      }

      // Incrementa o contador de likes
      post.contador_likes_post += 1;
      
      // Salva as alterações
      await post.save();
      
      res.json({
        success: true,
        newLikeCount: post.contador_likes_post
      });
      
    } catch (error) {
      console.error("Erro ao curtir post:", error);
      res.status(500).json({
        success: false,
        message: "Erro interno ao processar like"
      });
    }
  };

module.exports = controllers;
