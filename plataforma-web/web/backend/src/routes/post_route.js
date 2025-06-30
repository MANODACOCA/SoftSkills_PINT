const express = require('express');
const controller = require('../controllers/post_controller');
const router = express.Router();


// Rotas básicas do CRUD
router.get('/', (req, res) => {
  res.send("<h1>Endpoints de Posts</h1><br><b>Caminhos:</b><br>/list<br>/get/:id<br>/create<br>/update/:id<br>/delete/:id<br>/:postId/comments");
});

// Rotas CRUD
router.get('/list', controller.list);
router.get('/get/posts', controller.get);//buscar posts pelo id do conteudo partuilhado
router.post('/create', controller.create);//cria post novo
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);


module.exports = router;