const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).conteudos_partilhado;
const models = initModels(sequelize);
const controllers = {};

const conteudoPartilhadoService = require('../services/conteudo_partilhado.service');



controllers.list = async (req,res)=>{
  const data = await model.findAll({
      include: [
        {
          model: sequelize.models.topico,
          as: 'id_topico_topico',
          attributes: ['nome_topico']
        }
      ]
    });
  res.status(200).json(data);
};

controllers.get = async (req,res)=>{
  try{
    const {id} = req.params;
    const data = await model.findByPk(id);
    if(data){
      res.status(200).json(data);
    }else{
      res.status(404).json({erro: 'Conteudo Partilhado nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Conteudo Partilhado!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const data = await model.create(req.body);
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Conteudo Partilhado!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Conteudo Partilhado!',desc: err.message});
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
        res.status(404).json({erro:'Conteudo Partilhado nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Conteudo Partilhado!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Conteudo Partilhado!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id:id}});
    if(deleted){
      res.status(200).json({msg:'Conteudo Partilhado apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Conteudo Partilhado não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Conteudo Partilhado!',desc: err.message});
  }
};

controllers.getPostsByConteudoPartilhado = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validação básica do ID
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID do conteúdo partilhado inválido'
            });
        }

        const posts = await conteudoPartilhadoService.getPostsByConteudoPartilhado(parseInt(id));
        
        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        console.error('Erro no controller getPostsByConteudoPartilhado:', error);
        
        const statusCode = error.message.includes('não encontrado') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message,
        });
    }
};

/*------------------------------------------------------------------------------------------------------------*/

controllers.getForuns = async (req, res) => {
  try{
     const ordernar = req.query.ordenar || "Mais Recentes";
    const conteudos_partilhado = await conteudoPartilhadoService.getForuns(ordernar);

  if(conteudos_partilhado && conteudos_partilhado.length > 0){
    res.status(200).json(conteudos_partilhado);
  }else{
    res.status(404),json({ erro: 'Nenhum conteudo partilhado encontrado.'});
  }

  }catch(error){
    console.error('Erro ao procurar cursos disponiveis:', error);
    res.status(500).json({
      erro: 'Erro ao procurar conteudos partilhados.',
      desc: error.message
    });
  }
}

module.exports = controllers;
