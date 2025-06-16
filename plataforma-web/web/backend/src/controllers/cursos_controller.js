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
      const updated = await model.update(req.body, { where: { id_curso: id } });
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


/*------------------------------------------------------------------------------------------------------------*/


controllers.getCursosDisponiveisParaInscricao = async (req, res) => {
  try {
    const tipo = req.query.tipo || "todos";
    const id_curso = req.query.id_curso ? parseInt(req.query.id_curso) : null;
    const search = req.query.search || "";
    const idstopicos = req.query.idstopicos
      ? Array.isArray(req.query.idstopicos)
        ? req.query.idstopicos.map(Number)
        : req.query.idstopicos.split(',').map(Number)
      : [];
    const cursosDisponiveis = await cursosService.getCursosDiponiveisParaInscricao(tipo, id_curso, search, idstopicos);

    if (cursosDisponiveis) {
      res.status(200).json(cursosDisponiveis);
    } else {
      res.status(404).json({ erro: 'Nenhum curso disponível para inscrição encontrado.' });
    }
  } catch (err) {
    console.error('Erro ao procurar cursos disponíveis:', err);
    res.status(500).json({
      erro: 'Erro ao procurar cursos disponíveis para inscrição.',
      desc: err.message
    });
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

controllers.getCourseForYou = async (req, res) => {
  try {
    const ForYou = await cursosService.getCourseForYou();

    if (ForYou && ForYou.length > 0) {
      res.status(200).json(ForYou);
    } else {
      res.status(404).json({ erro: 'Nenhum top 8 cursos encontrado' });
    }
  } catch (err) {
    console.error('Erro ao procurar cursos:', err);
    res.status(500).json({ erro: 'Erro ao procurar top 8 cursos.', desc: err.message });
  }
};

controllers.getCoursePopular = async (req, res) => {
  try {
    const Popular = await cursosService.getCoursePopular();

    if (Popular && Popular.length > 0) {
      res.status(200).json(Popular);
    } else {
      res.status(404).json({ erro: 'Nenhum top 8 cursos encontrado' });
    }
  } catch (err) {
    console.error('Erro ao procurar cursos:', err);
    res.status(500).json({ erro: 'Erro ao procurar top 8 cursos.', desc: err.message });
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

controllers.getCourseNews = async (req, res) => {
  try {
    const News = await cursosService.getCourseNews();

    if (News && News.length > 0) {
      res.status(200).json(News);
    } else {
      res.status(404).json({ erro: 'Nenhum top 8 cursos encontrado' });
    }
  } catch (err) {
    console.error('Erro ao procurar cursos:', err);
    res.status(500).json({ erro: 'Erro ao procurar top 8 cursos.', desc: err.message });
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

controllers.getUserEnrolledCourses = async (req, res) => {
  try {
    const userId = req.params.id || req.params.userId;
    console.log('Parâmetros recebidos:', req.params);
    if (!userId) {
      return res.status(400).json({ erro: 'ID do usuário não fornecido' });
    }
    const tipologia = req.query.tipologia || null;

    console.log(`Buscando cursos para usuário ${userId} com tipologia: ${tipologia}`);

    const enrolledCourses = await cursosService.getEnrolledCoursesForUser(userId, tipologia);
    res.status(200).json(enrolledCourses);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar cursos inscritos', desc: err.message });
  }
};

controllers.getCompleteCourses = async (req, res) => {
  try {

    const userId = req.params.id || req.params.userId;
    const tipologia = req.query.tipologia || null;

    const completedCourses = await cursosService.getCompleteCoursesFromUser(userId, tipologia);

    if (completedCourses && completedCourses.length > 0) {
      res.status(200).json(completedCourses);
    } else {
      res.status(404).json({ erro: 'Nenhum curso terminado encontrado para este utilizador' });
    }
  } catch (err) {
    console.error('Erro ao procurar cursos terminados:', err);
    res.status(500).json({ erro: 'Erro ao procurar cursos terminados.', desc: err.message });
  }
};

controllers.getAllInfoCursosAdmin = async (req, res) => {
  try{
    const cursos = await cursosService.getAllCoursesWithAllInfo();
    res.status(200).json(cursos);
  } catch(error) {
    res.status(500).json({erro: 'Erro ao obter todos os cursos', desc: error.message });
  }
}




module.exports = controllers;
