const express = require('express');
const controller = require('../controllers/comentario_controller.js')
const router = express.Router();
const uploadConteudoComentario = require('../middlewares/uploadConteudoComentario')
const multer = require('multer');

router.get('/', (req, res) => {
  res.send("<h1>Ups! Está vazio aqui...</h1><br><b>Caminhos:</b><br>/list<br>/get/{id}<br>/create<br>/update/{id}<br>/delete/{id}");
});

//middleware
const uploadOptional = (req, res, next) => {
  const uploader = uploadConteudoComentario.single('ficheiro');

  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {

      return res.status(400).json({ erro: 'Erro no upload', desc: err.message });
    } else if (err) {

      return res.status(400).json({ erro: 'Erro inesperado', desc: err.message });
    }

    next();
  });
};

router.get('/get', (req, res) => {
  res.json({ erro: 'Sem id.' });
});
router.get('/update', (req, res) => {
  res.json({ erro: 'Sem id.' });
});
router.get('/delete', (req, res) => {
  res.json({ erro: 'Sem id.' });
});

router.get('/list', controller.list);
router.get('/get/comentarios', controller.get);//vais buscar comentarios pelo idpost
router.post('/create', uploadOptional, controller.create);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

router.put('/addLike/:id', controller.putLike);
router.put('/deleteLike/:id', controller.deleteLike);

module.exports = router;
