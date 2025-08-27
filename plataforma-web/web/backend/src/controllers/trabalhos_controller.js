const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).trabalhos;
const controllers = {};
const { criarNotifacoesGenerica } = require("../utils/SendNotification");

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
    if (!id_curso_tr || !id_formato_tr || !nome_tr || !descricao_tr || !data_entrega_tr) {
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

    if (!ficheiroURL && !caminho_tr) {
      return res.status(400).json({
        erro: 'Falta ficheiro ou URL',
        desc: 'Envie um ficheiro (campo "ficheiro") ou link externo'
      });
    }

    const payload = {
      id_curso_tr:      Number(id_curso_tr),
      id_formato_tr:    Number(id_formato_tr),
      nome_tr,
      caminho_tr:       ficheiroURL || caminho_tr,
      descricao_tr,
      data_entrega_tr
    };

    const data = await model.create(payload);
    try {
      await criarNotifacoesGenerica(
        'trabalho',
        'criação',
        req.body.nome_tr,
        req.body.id_curso_tr,
        sequelize
      );
    } catch (error) {
      console.error('Erro ao enviar notificação de criação de trabalho');
    }

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
    const {id} = req.params;

    const current = await model.findByPk(id);
    if (!current) return res.status(404).json({ erro: 'Trabalho não encontrado' });
      
    const ficheiroRelativo = req.file
      ? req.file.path.replace(/^.*[\\/]uploads[\\/]/, '')
      : null;

    const ficheiroURL = ficheiroRelativo
      ? `${req.protocol}://${req.get('host')}/uploads/${ficheiroRelativo}`
      : null;

    const {id_curso_tr, id_formato_tr, nome_tr, caminho_tr, descricao_tr, data_entrega_tr} = req.body;

     if (!ficheiroURL && !caminho_tr) {
      return res.status(400).json({
        erro: 'Corpo do pedido está vazio para update',
        desc: 'Envie pelo menos um campo para atualizar'});
    }

    const payload = {};
    if (id_curso_tr !== undefined) payload.id_curso_tr = Number(id_curso_tr);
    if (id_formato_tr !== undefined) payload.id_formato_tr = Number(id_formato_tr);
    if (nome_tr !== undefined) payload.nome_tr = nome_tr;
    if (descricao_tr !== undefined) payload.descricao_tr = descricao_tr;
    if (data_entrega_tr !== undefined) payload.data_entrega_tr = data_entrega_tr;
    if (ficheiroURL) payload.caminho_tr = ficheiroURL;
    else if (caminho_tr !== undefined)  payload.caminho_tr = caminho_tr;

    const [rows] = await model.update(payload, { where: { id_trabalho: id } });

    if (!rows) {
      return res.status(404).json({ erro: 'Trabalho não foi actualizado' });
    }

    try {
      await criarNotifacoesGenerica(
        'trabalho',
        'atualização',
        req.body.nome_tr,
        req.body.id_curso_tr,
        sequelize
      );
    } catch (error) {
      console.error('Erro ao enviar notificação de criação de trabalho');
    }

    const actualizado = await model.findByPk(id);
    res.status(200).json(actualizado);

  }catch(err){
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        erro: 'Ficheiro excede o limite',
        desc: 'O ficheiro não pode ultrapassar 100 MB'
      });
    }
    res.status(500).json({ erro: 'Erro ao atualizar Trabalho', desc: err.message });
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id_trabalho:id}});
    if(deleted){
      res.status(200).json({msg:'trabalhos apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Trabalhos não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a trabalhos!',desc: err.message});
  }
};

controllers.getTrabalhosByCurso = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await model.findAll({where: {id_curso_tr : id},});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({erro:'Erro ao encontrar trabalhos'});
  }
}

module.exports = controllers;
