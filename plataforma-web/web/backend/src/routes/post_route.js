const express = require('express');
const controller = require('../controllers/post_controller');
const router = express.Router();
const uploadConteudoPost = require('../middlewares/uploadConteudoPost');

// Rotas básicas do CRUD
router.get('/', (req, res) => {
  res.send("<h1>Endpoints de Posts</h1><br><b>Caminhos:</b><br>/list<br>/get/:id<br>/create<br>/update/:id<br>/delete/:id<br>/:postId/comments");
});

// Rotas CRUD
router.get('/list', controller.list);
router.get('/get/posts', controller.get);
router.post('/create', uploadConteudoPost.single('ficheiro'), controller.create);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

router.put('/addLike/:id', controller.putLike);
router.put('/deleteLike/:id', controller.deleteLike);


module.exports = router;