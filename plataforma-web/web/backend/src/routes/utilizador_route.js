const express = require('express');
const controller = require('../controllers/utilizador_controller.js')
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


router.get('/get/:id',controller.get);
router.put('/update/:id',controller.update);
router.delete('/delete/:id',controller.delete);

//para fazer login
router.get('/list',middleware.checkToken, controller.list);
router.post('/login', controller.login);
router.post('/create',controller.create);
router.post('/alterar-password',controller.alterarPassword);
router.post('/verificar-codigo',controller.verificarCodigo);
router.post('/esqueceu-password',controller.esqueceuPassword);


module.exports = router;
