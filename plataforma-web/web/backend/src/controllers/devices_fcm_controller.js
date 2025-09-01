//const model = require('../models/s_s_o');;

const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).devices_fcm;
const controllers = {};



controllers.list = async (req, res) => {
    const data = await model.findAll();
    res.status(200).json(data);
};

controllers.create = async (req, res) => {
    try {
        if (req.body) {
            const data = await model.create(req.body);
            res.status(201).json(data);
        } else {
            res.status(400).json({ erro: 'Erro ao criar devices FCM!', desc: 'Corpo do pedido esta vazio.' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar devices FCM!', desc: err.message });
    }
};

controllers.delete = async (req, res) => {
    try {
        const { id_utilizador, token } = req.body;
        console.log("REQ BODY DELETE:", req.body);

        const deleted = await model.destroy({
            where: {
                id_utilizador: id_utilizador, 
                token: token
            }
        });
        if (deleted) {
            res.status(200).json({ msg: 'Devices FCM apagado/a com sucesso!' });
        } else {
            res.status(404).json({ erro: 'Devices FCM não foi apagado/a!' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao apagar o/a devices FCM!', desc: err.message });
    }
};

module.exports = controllers;
