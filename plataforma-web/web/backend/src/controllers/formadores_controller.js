//const model = require('../models/formadores');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const { enviarEmailUpgradeAprovado, enviarEmailUpgradeAtribuido, enviarEmailUpgradeRecusado } = require("../utils/enviarEmail");
const model = initModels(sequelize).formadores;
const controllers = {};
const { utilizador, pedidos_upgrade_cargo} = require('../models/init-models')(sequelize);

controllers.list = async (req,res)=>{
  try{
    const data = await model.findAll({
      attributes: [
        'id_formador',
        'descricao_formador'        
      ],
      include: [
        {
          model: utilizador,
          as: 'id_formador_utilizador',
          attributes: ['nome_utilizador']
        }
      ]
    });
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json({error: 'Erro ao listar utilizadores!', desc: error.message});
  }
};

controllers.get = async (req,res)=>{
  try{
    const {id} = req.params;
    const data = await model.findByPk(id);
    if(data){
      res.status(200).json(data);
    }else{
      res.status(404).json({erro: 'Formador nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Formador!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    const {id_formador} = req.body;

    if(!req.body || !id_formador){
      return res.status(400).json({erro: 'Erro ao criar Formador!',desc: 'Corpo do pedido esta vazio.'});
    }
  
    const pedidoExistente = await pedidos_upgrade_cargo.findOne({ where: { id_formando: id_formador } });

    if (pedidoExistente) {
      await pedidos_upgrade_cargo.destroy({ where: { id_formando: id_formador } });
    }

    const data = await model.create(req.body);

    if (pedidoExistente) {
      const user = await utilizador.findOne({ where: { id_utilizador: id_formador } });
      if (user?.email) {
        await enviarEmailUpgradeAprovado(user.email);
      }
    } else {
      const user = await utilizador.findOne({ where: { id_utilizador: id_formador } });
      if (user?.email) {
        await enviarEmailUpgradeAtribuido(user.email);
      }
    }

    res.status(201).json(data);
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Formador!',desc: err.message});
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
        res.status(404).json({erro:'Formador nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Formador!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Formador!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_formador: id}});
    const user = await utilizador.findOne({ where: { id_utilizador: id } });
    if (user?.email) {
      await enviarEmailUpgradeRecusado(user.email);
    }
    if(deleted){
      res.status(200).json({msg:'Formador apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Formador não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Formador!',desc: err.message});
  }
};

module.exports = controllers;
