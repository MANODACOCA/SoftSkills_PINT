const express = require('express');
const controller = require('../controllers/devices_fcm_controller.js')
const router = express.Router();

router.get('/',(req, res) => {
  res.send("<h1>Ups! Está vazio aqui...</h1><br><b>Caminhos:</b><br>/list<br>/get/{id}<br>/create<br>/update/{id}<br>/delete/{id}");
});

router.get('/list',controller.list);
router.get('/get/:id_utilizador/:token',controller.get);
router.post('/save-token',controller.create);
router.delete('/delete-token',controller.delete);

module.exports = router;
