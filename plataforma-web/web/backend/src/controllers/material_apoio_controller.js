//const model = require('../models/material_apoio');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).material_apoio;
const controllers = {};
const materialApoio = require('../services/material_apoio.service');
const fs = require('fs').promises;
const path = require('path');
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
      res.status(404).json({erro: 'Material de Apoio nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Material de Apoio!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    const {id_curso, id_formato, nome_material, conteudo } = req.body;
    if (!id_curso || !id_formato || !nome_material) {
      return res.status(400).json({
        erro: 'Campos obrigatórios em falta',
        desc: 'id_curso, id_formato e nome_material são obrigatórios'
      });
    }
    
    const ficheiroRelativo = req.file
      ? req.file.path.replace(/^.*[\\/]uploads[\\/]/, '') 
      : null;

    const ficheiroURL = ficheiroRelativo
      ? `${req.protocol}://${req.get('host')}/uploads/${ficheiroRelativo}`
      : null;

    if (!ficheiroURL && !conteudo) {
      return res.status(400).json({
        erro: 'Falta ficheiro ou URL',
        desc: 'Envie um ficheiro (campo "ficheiro") ou o campo "conteudo" com o link externo'
      });
    }

    const payload = {
      id_curso:      Number(id_curso),
      id_formato:    Number(id_formato),
      nome_material,                       
      conteudo:      ficheiroURL || conteudo  
    };

    try {
      await criarNotifacoesGenerica(
        'material de apoio',
        'criação',
        req.body.nome_material,
        req.body.id_curso,
        sequelize
      );
    } catch (error) {
      console.error('Erro ao enviar notificação de criação de aula');
    }
    const data = await model.create(payload);
    res.status(201).json(data);
  }catch(err){
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        erro: 'Ficheiro excede o limite',
        desc: 'O ficheiro não pode ultrapassar 100 MB)'
      });  
    }
    res.status(500).json({erro: 'Erro ao criar material de apoio!', desc: err.message});
  };
};


controllers.update = async (req,res)=>{
  try {
    const {id} = req.params;

    const current = await model.findByPk(id);
    if (!current) return res.status(404).json({ erro: 'Material não encontrado' });
      
    const ficheiroRelativo = req.file
      ? req.file.path.replace(/^.*[\\/]uploads[\\/]/, '')
      : null;

    const ficheiroURL = ficheiroRelativo
      ? `${req.protocol}://${req.get('host')}/uploads/${ficheiroRelativo}`
      : null;

    const {id_curso, id_formato, nome_material, conteudo} = req.body;

    if(ficheiroURL === null && conteudo === undefined && id_curso === undefined && id_formato === undefined && nome_material === undefined) {
      return res.status(400).json({
        erro: 'Corpo do pedido está vazio para update',
        desc: 'Envie pelo menos um campo para atualizar'});
    }

    const payload = {};
    if (id_curso !== undefined) payload.id_curso = Number(id_curso);
    if (id_formato !== undefined) payload.id_formato = Number(id_formato);
    if (nome_material !== undefined) payload.nome_material = nome_material;
    if (ficheiroURL) payload.conteudo = ficheiroURL;
    else if (conteudo !== undefined)  payload.conteudo = conteudo;

    const [rows] = await model.update(payload, { where: { id_material_apoio: id } });

    if (!rows) {
      return res.status(404).json({ erro: 'Material não foi actualizado' });
    }

    try {
      await criarNotifacoesGenerica(
        'material de apoio',
        'atualização',
        req.body.nome_material,
        req.body.id_curso,
        sequelize
      );
    } catch (error) {
      console.error('Erro ao enviar notificação de criação de aula');
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
    res.status(500).json({ erro: 'Erro ao atualizar Material de Apoio', desc: err.message });
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const material = await model.findByPk(id);
    if(!material){
      return res.status(400).json({erro: 'Material de Apoio não encontrado'});
    }

    const isLocal = material.conteudo && !/^https?:\/\//i.test(material.conteudo);

    if (isLocal) {
      const filePath = path.join(__dirname, '..', 'uploads', material.conteudo);
      try {
        await fs.unlink(filePath);
        console.log('Ficheiro apagado:', filePath);
      } catch (e) {
        if (e.code !== 'ENOENT') console.warn('Erro ao apagar ficheiro:', e.message);
      }
    }

    await material.destroy();
    res.status(200).json({msg:'Material de Apoio apagado com sucesso!'});
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Material de Apoio!',desc: err.message});
  }
};


controllers.getMaterial_Apoio = async (req, res) => {
  try{
    const {cursoID} = req.params;
    const data = await materialApoio.getMaterialApoioDoCurso(cursoID);
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao carregar material apoio:', error);
    res.status(500).json({
      erro: 'Erro ao carregar material apoio',
      desc: error.message,
    })
  }
}




module.exports = controllers;
