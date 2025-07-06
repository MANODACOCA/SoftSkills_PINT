//const model = require('../models/denuncia');;

const { where } = require("sequelize");
const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).denuncia;
const controllers = {};
const { comentario, post, utilizador} = require('../models/init-models')(sequelize);

const denunciasService = require('../services/denuncias.service');


controllers.list = async (req, res)=>{
  try{
    const data = await denunciasService.getDenunciasAll();
    res.status(200).json(data);
  }catch(error){
    res.status(500).json({erro: 'Erro ao procurar Denuncia!',desc: error.message});
    throw(error);
  }
};

controllers.get = async (req,res)=>{
  try{
    const {id} = req.params;
    const data = await model.findByPk(id);
    if(data){
      res.status(200).json(data);
    }else{
      res.status(404).json({erro: 'Denuncia nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Denuncia!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const {id_comentario, id_utilizador, id_post, id_tipo_denuncia} = req.body;
      const data = await model.create({id_comentario, id_utilizador, id_post, id_tipo_denuncia});
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Denuncia!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Denuncia!',desc: err.message});
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
        res.status(404).json({erro:'Denuncia nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Denuncia!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Denuncia!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_denuncia : id}});
    if(deleted){
      res.status(200).json({msg:'Denuncia apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Denuncia não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Denuncia!',desc: err.message});
  }
};

controllers.countDenuncias = async (req, res) => {
  try{
    const total = await model.count();
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json('Erro ao contar denuncias');
  }
}

controllers.getConteudoDenunciado = async (req, res) => {
  try {
    const {id} = req.params;
    const d = await model.findByPk(id);
    if(!d) return;
    let conteudoDenunciado;
    if(d.id_post) {
        conteudoDenunciado = await post.findOne({
          where: {id_post : d.id_post},
            include: [
              {
                model: utilizador,
                as: 'posts',
                attributes: [
                  [sequelize.col('id_utilizador'), 'id_util'],
                  [sequelize.col('nome_utilizador'), 'nome_util'],
                  [sequelize.col('img_perfil'), 'img_util'],
                  'email',
                ]
              }
            ]
        },
      );
    } else {
        conteudoDenunciado = await comentario.findOne({
          where: {id_comentario : d.id_comentario},
          include: [
            {
              model: utilizador,
                as: 'comentarios',
                attributes: [
                  [sequelize.col('id_utilizador'), 'id_util'],
                  [sequelize.col('nome_utilizador'), 'nome_util'],
                  [sequelize.col('img_perfil'), 'img_util'],
                  'email',
              ]
            }
          ],
        },
      );
    }
    res.status(200).json(conteudoDenunciado);
  } catch (error) {
    res.status(500).json('Erro ao encontrar denuncias');
  }
}


module.exports = controllers;
