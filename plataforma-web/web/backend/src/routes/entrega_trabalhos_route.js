const express = require('express');
const controller = require('../controllers/entrega_trabalhos_controller.js')
const router = express.Router();
const uploadEntregaTrabalhos = require('../middlewares/uploadEntregaTrabalhos');

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
router.get('/get/:id_trabalho/:id_formando',controller.get);
router.post('/create', uploadEntregaTrabalhos.single('ficheiro'), controller.create);
router.put('/update', uploadEntregaTrabalhos.single('ficheiro'),controller.update);
router.delete('/delete/:id_trabalho/:id_formando',controller.delete);

module.exports = router;