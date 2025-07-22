const express = require('express');
const controller = require('../controllers/utilizador_controller.js');
const { checkTokenUserForBlock } = require('../middlewares/blockUser.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("<h1>Ups! Está vazio aqui...</h1><br><b>Caminhos:</b><br>/list<br>/get/{id}<br>/create<br>/update/{id}<br>/delete/{id}");
});

router.get('/get', (req, res) => {
  res.json({ erro: 'Sem id.' });
});
router.get('/update', (req, res) => {
  res.json({ erro: 'Sem id.' });
});
router.get('/delete', (req, res) => {
  res.json({ erro: 'Sem id.' });
});


router.get('/get/:id', controller.get);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

//para fazer login
router.get('/list', controller.list);/* middleware.checkToken */
router.post('/login', controller.login);
router.post('/create', controller.create);
router.post('/alterar-password', controller.alterarPassword);
router.post('/verificar-codigo', controller.verificarCodigo);
router.post('/resend-codigo', controller.resendCodeTwoFa);
router.post('/esqueceu-password', controller.esqueceuPassword);
router.post('/alterar-imgperfil/:id', controller.alterarImgPerfil);
router.get('/count', controller.countUtilizadores);
router.get('/verificar-utilizador-block', checkTokenUserForBlock, controller.verificarUserState);

module.exports = router;
