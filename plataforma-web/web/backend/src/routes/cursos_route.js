const express = require('express');
const controller = require('../controllers/cursos_controller.js')
const router = express.Router();
const middleware = require('../middlewares/middleware_login');

router.get('/',(req, res) => {
  res.send("<h1>Ups! Está vazio aqui...</h1><br><b>Caminhos:</b><br>/list<br>/get/{id}<br>/create<br>/update/{id}<br>/delete/{id}");
});

router.get('/get',(req, res) => {
  res.json({erro: 'Sem id.'});
});
router.get('/update',(req, res) => {
  res.json({erro: 'Sem id.'});
});
router.get('/delete',(req, res) => {
  res.json({erro: 'Sem id.'});
});

router.get('/list',controller.list);
router.get('/get/:id',controller.get);
router.post('/create',controller.create);
router.put('/update/:id',controller.update);
router.delete('/delete/:id',controller.delete);

//Nossas Rotas:
router.get('/curso-destaque/topcurso',controller.getDestaqueCourses);
router.get('/cursos-destaque/top8foryou',controller.getCourseForYou);
router.get('/cursos-destaque/top8popular',controller.getCoursePopular);
router.get('/curso-destaque/assincrono',controller.getDestaqueAssincrono);
router.get('/cursos-destaque/top8news',controller.getCourseNews);
router.get('/curso-destaque/sincrono',controller.getDestaqueSincrono);
router.get('/cursos-disponiveis-inscricao', controller.getCursosDisponiveisParaInscricao);//todos os curso com formador, aulas e conteudos
router.get('/users/:userId/enrolled-courses',controller.getUserEnrolledCourses);
router.get('/users/:userId/completed-courses',controller.getCompleteCourses);
router.get('/all-info',controller.getAllInfoCursosAdmin);
router.get('/verificar/:userId/:cursoId',controller.verificarInscricao);

module.exports = router;
