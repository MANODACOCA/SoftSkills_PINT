const express = require('express');
const controller = require('../controllers/post_controller');
const router = express.Router();

// Rotas para comentários (devem vir antes das rotas dinâmicas)
router.get('/:postId/comments', controller.getCommentsByPost);

// Rotas básicas do CRUD
router.get('/', (req, res) => {
  res.send("<h1>Endpoints de Posts</h1><br><b>Caminhos:</b><br>/list<br>/get/:id<br>/create<br>/update/:id<br>/delete/:id<br>/:postId/comments");
});

// Rotas CRUD
router.get('/list', controller.list);
router.get('/get/:id', controller.get);
router.post('/create', controller.create);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;