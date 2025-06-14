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
const path = require('path');
const fs = require('fs');
const uploadProfileImg = require('../middlewares/uploadUserProfileIMG');

const gerarPassword = require('../utils/gerarPassword');
const { sendEmail, enviarEmailVerificaCode } = require("../utils/enviarEmail");
const { guardarCodigo, verificarCodigoCerto, apagarCodigo } = require('../utils/guardar_codigo');
const utilizador = require("../models/utilizador");
const { error } = require("console");

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
      const updated = await model.update(req.body, { where: { id_utilizador: id } });
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

controllers.alterarImgPerfil = async (req, res) => {
  uploadProfileImg.single('imagem')(req, res, async (error) => {
    try {
      if (error) {
        return res.status(400).json({ erro: 'Erro no upload da imagem.', desc: error.message });
      }

      if (req.body) {
        const { id } = req.params;

        const user = await model.findByPk(id);
        if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });

        const caminhoAntigo = path.resolve('src/uploads/usersProfilesImg', user.img_perfil);//apagar imagem antiga
        if (fs.existsSync(caminhoAntigo)) {
          fs.unlinkSync(caminhoAntigo);
        }

        if (!req.file) {
          return res.status(400).json({ erro: 'Nenhum ficheiro foi submetido.' });
        }
        user.img_perfil = req.file.filename;
        await user.save();

        res.status(200).json({
          mesagem: 'Imagem de perfil guardada com sucesso!',
          ficheiro: req.file.filename
        });
      } else {
        res.status(400).json({ erro: 'Erro ao atualizar o/a Utilizador!', desc: 'Corpo do pedido esta vazio.' });
      }
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar imagem do utilizador!', desc: error.message });
    }
  });
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

  try {
    const user = await model.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ success: false, field: 'email', message: 'Email inválido!' });
    }
    if (!bcrypt.compareSync(password, user.password_util)) {
      return res.status(401).json({ success: false, field: 'password', message: 'Password inválida!' });
    }

    if (user.auten2fat) {
      const codigo = Math.floor(10000 + Math.random() * 90000).toString();
      await guardarCodigo(email, codigo);
      await enviarEmailVerificaCode(email, codigo);
    }

    const roles = [];

    let token = jwt.sign({ email, id: user.id_utilizador }, config.jwtSecret, { expiresIn: '120min' });
    res.json({ success: true, message: 'Autenticação realizada com sucesso!', token: token, jaAtivou: user.data_ativ_utili, twoFa: user.auten2fat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erro ao fazer login!' });
  }
};

controllers.alterarPassword = async (req, res) => {
  const { email, novaPassword } = req.body;

  try {
    const utilizador = await model.findOne({ where: { email } });
    if (!utilizador) {
      return res.status(404).json({ success: false, message: 'Utilizador não encontrado.' });
    } else if (bcrypt.compareSync(novaPassword, utilizador.password_util)) {
      return res.status(409).json({ success: false, message: 'Essa é a sua password atual! Tente outra.' });
    }

    const hash = await bcrypt.hash(novaPassword, 10);
    utilizador.password_util = hash;

    utilizador.data_ativ_utili = new Date();

    await utilizador.save();

    return res.json({ success: true, message: 'Password alterada' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erro ao alterar a password.' });
  }
};

controllers.esqueceuPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email é obrigatório.' });
  }
  try {
    const utilizador = await model.findOne({ where: { email } });
    if (!utilizador) {
      return res.status(404).json({ success: false, message: 'Utilizador não encontrado.' });
    }

    const codigo = Math.floor(10000 + Math.random() * 90000).toString();

    await guardarCodigo(email, codigo);
    await enviarEmailVerificaCode(email, codigo);

    return res.status(200).json({ success: true, message: 'Código enviado com sucesso para o email.' });
  } catch (error) {
    console.error('Erro ao enviar código de verificação:', error);
    return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
};

controllers.verificarCodigo = async (req, res) => {
  const { email, codigo } = req.body;

  try {
    const valido = verificarCodigoCerto(email, codigo);
    if (!valido) {
      return res.status(401).json({ success: false, message: 'Código inválido ou expirado.' });
    }

    const utilizador = await model.findOne({ where: { email } });
    if (!utilizador) {
      return res.status(404).json({ success: false, message: 'Utilizador não encontrado.' });
    }

    utilizador.data_ativ_utili = new Date();
    await utilizador.save();
    apagarCodigo(email);

    return res.json({ success: true, message: 'Conta ativada com sucesso.' });
  } catch (err) {
    console.error('Erro ao ativar conta:', err);
    return res.status(500).json({ success: false, message: 'Erro ao ativar conta.' });
  }
};

module.exports = controllers;
