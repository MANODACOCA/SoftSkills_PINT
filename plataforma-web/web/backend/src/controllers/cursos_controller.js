//const model = require('../models/cursos');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).cursos;
const controllers = {};
const cursosService = require('../services/cursos.service');



controllers.list = async (req, res) => {
  const data = await model.findAll();
  res.status(200).json(data);
};

controllers.get = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ erro: 'Curso nao encontrado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar Curso!', desc: err.message });
  }
};

controllers.create = async (req, res) => {
  try {
    if (req.body) {
      const data = await model.create(req.body);
      res.status(201).json(data);
    } else {
      res.status(400).json({ erro: 'Erro ao criar Curso!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar Curso!', desc: err.message });
  }
};

controllers.update = async (req, res) => {
  try {
    if (req.body) {
      const { id } = req.params;
      const updated = await model.update(req.body, { where: { id: id } });
      if (updated) {
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      } else {
        res.status(404).json({ erro: 'Curso nao foi atualizado/a!' });
      }
    } else {
      res.status(400).json({ erro: 'Erro ao atualizar o/a Curso!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o/a Curso!', desc: err.message });
  }
};

controllers.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await model.destroy({ where: { id: id } });
    if (deleted) {
      res.status(200).json({ msg: 'Curso apagado/a com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Curso não foi apagado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar o/a Curso!', desc: err.message });
  }
};

controllers.getDestaqueSincrono = async (req, res) => {
  try {
    const curso = await cursosService.getCourseDestaqueSincrono();
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ erro: 'Nenhum curso síncrono em destaque encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar curso síncrono em destaque', desc: err.message });
  }
};

controllers.getDestaqueAssincrono = async (req, res) => {
  try {
    const curso = await cursosService.getCourseDestaqueAssincrono();
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ erro: 'Nenhum curso assíncrono em destaque encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar curso assíncrono em destaque', desc: err.message });
  }
};

controllers.getDestaqueCourses = async (req, res) => {
  try {
    const curso = await cursosService.getCourseWithMoreFormandos();
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ erro: 'Nenhum curso encontrado com formandos inscritos.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar curso com formandos inscritos', desc: err.message });
  }
};

controllers.getEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const { tipologia } = req.query;

    const enrolledCourses = await cursosService.getEnrolledCoursesForUser(userId, tipologia);

    if (enrolledCourses && enrolledCourses.length > 0) {

      res.status(200).json(enrolledCourses);
    } else {
      res.status(404).json({ erro: 'Nenhum curso encontrado para este utilizador' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar cursos inscritos.', desc: err.message });
  }
};

controllers.getCompleteCourses = async (req, res) => {
  try{
    const {userId} =req.params;
    const completedCourses = await cursosService.getCompleteCoursesFromUser(userId);

    if(completedCourses && completedCourses.length > 0){
      res.status(200).json(completedCourses);
    } else{
      res.status(404).json({erro: 'Nenhum curso terminado encontrado para este utilizador'});
    }
  } catch(err){
    console.error('Erro ao procurar cursos terminados:', err);
    res.status(500).json({erro: 'Erro ao procurar cursos terminados.', desc: err.message});
  }
};

module.exports = controllers;
