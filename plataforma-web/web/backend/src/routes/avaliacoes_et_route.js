const express = require('express');
const controller = require('../controllers/avaliacoes_et_controller.js')
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
router.get('/get/:id_entrega_trabalho',controller.get);
router.post('/create',controller.create);
router.put('/update/:id_entrega_trabalho',controller.update);
router.delete('/delete/:id_entrega_trabalho',controller.delete);

module.exports = router;
