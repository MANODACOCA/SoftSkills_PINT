const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).trabalhos;
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
      res.status(404).json({erro: 'Trabalhos nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar trabalhos!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
  const {id_curso_tr, id_formato_tr, nome_tr, caminho_tr, descricao_tr, data_entrega_tr } = req.body;
    if (!id_curso_tr || id_formato_tr || !nome_tr || !caminho_tr || !descricao_tr || !data_entrega_tr) {
      return res.status(400).json({
        erro: 'Campos obrigatórios em falta',
        desc: 'Todo os campos para os trablahos são obrigatórios'
      });
    }
    
    const ficheiroRelativo = req.file
      ? req.file.path.replace(/^.*[\\/]uploads[\\/]/, '') 
      : null;

    const ficheiroURL = ficheiroRelativo
      ? `${req.protocol}://${req.get('host')}/uploads/${ficheiroRelativo}`
      : null;

    if (!ficheiroURL) {
      return res.status(400).json({
        erro: 'Falta ficheiro ou URL',
        desc: 'Envie um ficheiro (campo "ficheiro") ou link externo'
      });
    }

    const payload = {
      id_curso_tr:      Number(id_curso_tr),
      id_formato_tr:    Number(id_formato_tr),
      nome_tr,
      caminho_tr:       ficheiroURL,
      descricao_tr,
      data_entrega_tr
    };

      const data = await model.create(payload);
      res.status(201).json(data);
  }catch(err){
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        erro: 'Ficheiro excede o limite',
        desc: 'O ficheiro não pode ultrapassar 100 MB)'
      });  
    }
    res.status(500).json({erro: 'Erro ao criar trabalho!', desc: err.message});
  };
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
        res.status(404).json({erro:'Trabalhos nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a trabalhos!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a trabalhos!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id:id}});
    if(deleted){
      res.status(200).json({msg:'trabalhos apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Trabalhos não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a trabalhos!',desc: err.message});
  }
};

module.exports = controllers;
