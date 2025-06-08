//const model = require('../models/utilizador');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).utilizador;
const controllers = {};
//para login
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require('../config/config');
//const {  } = require('../services/login.service');
const gerarPassword = require('../utils/gerarPassword');
const sendEmail = require("../utils/enviarEmail");

controllers.list = async (req, res) => {
  const data = await model.findAll();
  res.status(200).json({ success: true, data: data });
};

controllers.get = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ erro: 'Utilizador nao encontrado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao procurar Utilizador!', desc: err.message });
  }
};

controllers.create = async (req, res) => {
  try {
    const {
      nome_utilizador,
      email
    } = req.body;

    const existingUser = await model.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Utilizador já existe.' });
    }

    if (email && nome_utilizador) {

      const passwordTemporaria = gerarPassword();

      const data = await model.create({
        email,
        password_util: passwordTemporaria, // será encriptada automaticamente
        nome_utilizador
      });

      await sendEmail(email, passwordTemporaria);

      res.status(201).json({ success: true, message: "Registado", data: data });
    } else {
      res.status(400).json({
        erro: 'Erro ao criar Utilizador!',
        desc: 'Campos obrigatórios em falta.'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      erro: 'Erro ao criar Utilizador!',
      desc: err.message
    });
  }
};

controllers.update = async (req, res) => { // atualizar e isnerir um novo utilizador com uma passe radom no email
  try {
    if (req.body) {
      const { id } = req.params;
      const updated = await model.update(req.body, { where: { id: id } });
      if (updated) {
        const modelUpdated = await model.findByPk(id);
        res.status(200).json(modelUpdated);
      } else {
        res.status(404).json({ erro: 'Utilizador nao foi atualizado/a!' });
      }
    } else {
      res.status(400).json({ erro: 'Erro ao atualizar o/a Utilizador!', desc: 'Corpo do pedido esta vazio.' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o/a Utilizador!', desc: err.message });
  }
};

controllers.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await model.destroy({ where: { id: id } });
    if (deleted) {
      res.status(200).json({ msg: 'Utilizador apagado/a com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Utilizador não foi apagado/a!' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar o/a Utilizador!', desc: err.message });
  }
};

controllers.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await model.findOne({ where: { email: email } });

  if (!user || !bcrypt.compareSync(password, user.password_util)) {
    return res.status(403).json({ success: false, message: 'Dados de autenticação inválidos.' });
  }

  let token = jwt.sign({ email, id: user.id_utilizador }, config.jwtSecret, { expiresIn: '1h' });
  res.json({ success: true, message: 'Autenticação realizada com sucesso!', token: token });
};


// controllers.requestAccount = async (req, res) => {
//   const { email } = req.body;

//   const existingUser = await model.findOne({ where: { email } });
//   if (existingUser) {
//     return res.status(400).json({ success: false, message: 'Utilizador já existe.' });
//   }

//   const tempPassword = crypto.randomBytes(6).toString('hex');
//   const hashedPassword = await bcrypt.hash(tempPassword, 10);

//   try {
//     const newUser = await model.create({
//       email,
//       password_util: hashedPassword,
//       nome_utilizador: 'A definir...' 
//     });

//     const token = jwt.sign(
//       { email: newUser.email, tipo: 'ativacao' },
//       config.jwtSecret,
//       { expiresIn: '15m' }
//     );

//     await sendActivationEmail(email, tempPassword, token);

//     return res.json({ success: true, message: 'Email de ativação enviado com sucesso.' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: 'Erro ao criar utilizador.' });
//   }
// };


module.exports = controllers;
