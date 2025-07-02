const express = require('express');
const controller = require('../controllers/likes_comentario_controller.js')
const router = express.Router();

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
router.get('/get/:id_comentario/:id_utilizador', controller.get);
router.post('/create',controller.create);
router.delete('/delete',controller.delete);

module.exports = router;
