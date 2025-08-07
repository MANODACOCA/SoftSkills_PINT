//const model = require('../models/certificados');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).certificados;
const controllers = {};
const {gerarCertificado} = require('../utils/gerarCertificado');
const puppeteer = require('puppeteer');
const { cursos, utilizador, inscricoes, resultados } = require('../models/init-models')(sequelize);

controllers.gerarCertificado = async (req, res) => {
  try {
    const { cursoId, formandoId } = req.params;
    let notaFinal = null;

    const formando = await utilizador.findByPk(formandoId);
    const curso = await cursos.findByPk(cursoId);

    if (!formando || !curso) {
      return res.status(404).json({ erro: 'Dados não encontrados.' });
    }

    if (curso.issincrono) {
      const resultado = await resultados.findOne({
        where: {
          id_formando: formandoId,
          id_curso_sincrono: curso.id_curso 
        }
      });
      notaFinal = resultado ? resultado.resul : null;
      if (!notaFinal || notaFinal < 10) {
        return res.status(403).json({ erro: 'Nota insuficiente.' });
      }
    }

    if (!curso.issincrono && new Date() < new Date(curso.data_fim_curso)) {
      return res.status(403).json({ erro: 'Curso ainda não terminou.' });
    }

    const html = gerarCertificado({
      nomeFormando: formando.nome_util,
      nomeCurso: curso.nome_curso,
      dataConclusao: curso.data_fim_curso,
      notaFinal: notaFinal
    });

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    await model.update(
      { certificado_final: 'transferido' },
      { where: { id_formando: formandoId, id_curso: cursoId } }
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="certificado_${cursoId}_${formandoId}.pdf"`
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao gerar certificado.', desc: err.message });
  }
};

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
      res.status(404).json({erro: 'Certificados nao encontrado/a!'});
    }
  }catch (err){
    res.status(500).json({erro: 'Erro ao procurar Certificados!',desc: err.message});
  }
};

controllers.create = async (req,res)=>{
  try{
    if(req.body){
      const data = await model.create(req.body);
      res.status(201).json(data);
    }else{
      res.status(400).json({erro: 'Erro ao criar Certificados!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao criar Certificados!',desc: err.message});
  }
};

controllers.update = async (req,res)=>{
  try {
    if(req.body){
      const {id} = req.params;
      const updated = await model.update(req.body,{where:{id_certificado :id}});
      if(updated){
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      }else{
        res.status(404).json({erro:'Certificados nao foi atualizado/a!'});
      }
    }else{
      res.status(400).json({erro: 'Erro ao atualizar o/a Certificados!',desc: 'Corpo do pedido esta vazio.'});
    }
  }catch(err){
    res.status(500).json({erro: 'Erro ao atualizar o/a Certificados!',desc: err.message});
  }
};

controllers.delete = async (req,res)=>{
  try {
    const {id} = req.params;
    const deleted = await model.destroy({where:{id:id}});
    if(deleted){
      res.status(200).json({msg:'Certificados apagado/a com sucesso!'});
    }else{
      res.status(404).json({erro:'Certificados não foi apagado/a!'});
    }
  }catch(err) {
    res.status(500).json({erro:'Erro ao apagar o/a Certificados!',desc: err.message});
  }
};

module.exports = controllers;
