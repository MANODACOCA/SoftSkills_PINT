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

router.get('/list', middleware.checkToken, controller.list);
router.get('/get/:id', middleware.checkToken,controller.get);
router.post('/create', middleware.checkToken,controller.create);
router.put('/update/:id', middleware.checkToken,controller.update);
router.delete('/delete/:id', middleware.checkToken,controller.delete);

//Nossas Rotas:
router.get('/curso-destaque/topcurso', middleware.checkToken,controller.getDestaqueCourses);
router.get('/cursos-destaque/top8foryou', middleware.checkToken,controller.getCourseForYou);
router.get('/cursos-destaque/top8popular', middleware.checkToken,controller.getCoursePopular);
router.get('/curso-destaque/assincrono', middleware.checkToken,controller.getDestaqueAssincrono);
router.get('/cursos-destaque/top8news', middleware.checkToken,controller.getCourseNews);
router.get('/curso-destaque/sincrono', middleware.checkToken,controller.getDestaqueSincrono);
router.get('/cursos-disponiveis-inscricao', middleware.checkToken, controller.getCursosDisponiveisParaInscricao);//todos os curso com formador, aulas e conteudos
router.get('/users/:userId/enrolled-courses', middleware.checkToken,controller.getUserEnrolledCourses);
router.get('/users/:userId/completed-courses', middleware.checkToken,controller.getCompleteCourses);
router.get('/all-info', middleware.checkToken,controller.getAllInfoCursosAdmin);
router.get('/verificar/:userId/:cursoId', middleware.checkToken,controller.verificarInscricao);

module.exports = router;
