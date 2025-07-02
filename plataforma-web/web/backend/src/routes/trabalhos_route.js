const express = require('express');
const controller = require('../controllers/trabalhos_controller.js')
const router = express.Router();
const uploadTrabalhos = require('../middlewares/uploadTrabalhos.js');

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
router.post('/create',uploadTrabalhos.single('ficheiro'),controller.create);
router.put('/update/:id',uploadTrabalhos.single('ficheiro'),controller.update);
router.delete('/delete/:id',controller.delete);

module.exports = router;