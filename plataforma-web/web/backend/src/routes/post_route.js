const express = require('express');
const controller = require('../controllers/post_controller');
const router = express.Router();
const uploadConteudoPost = require('../middlewares/uploadConteudoPost');
const multer = require('multer');

// Rotas básicas do CRUD
router.get('/', (req, res) => {
  res.send("<h1>Endpoints de Posts</h1><br><b>Caminhos:</b><br>/list<br>/get/:id<br>/create<br>/update/:id<br>/delete/:id<br>/:postId/comments");
});

//middleware
const uploadOptional = (req, res, next) => {
  const uploader = uploadConteudoPost.single('ficheiro');

  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Erro do multer (ex: tamanho, tipo)
      return res.status(400).json({ erro: 'Erro no upload', desc: err.message });
    } else if (err) {
      // Outro erro qualquer
      return res.status(400).json({ erro: 'Erro inesperado', desc: err.message });
    }
    // Continua mesmo sem ficheiro
    next();
  });
};

// Rotas CRUD
router.get('/list', controller.list);
router.get('/get/posts', controller.get);
router.post('/create', uploadOptional, controller.create);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

router.put('/addLike/:id', controller.putLike);
router.put('/deleteLike/:id', controller.deleteLike);


module.exports = router;