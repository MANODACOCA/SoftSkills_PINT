const { where } = require("sequelize");
const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const { enviarEmailUpgradeRecusado } = require("../utils/enviarEmail");
const { utilizador, formandos } = require('../models/init-models')(sequelize);
const model = initModels(sequelize).pedidos_upgrade_cargo;
const controllers = {};


controllers.list = async (req, res) => {
    try {
        const data = await model.findAll({
            include: [
                {
                    model: formandos,
                    as: "id_formando_formando",
                    include: [
                        {
                            model: utilizador,
                            as: "id_formando_utilizador",
                            attributes: [
                                [sequelize.col('id_utilizador'), 'id_util'],
                                [sequelize.col('nome_utilizador'), 'nome_util'],
                                [sequelize.col('email'), 'email'],
                                'isformador'
                            ]
                        }
                    ]
                }
            ]
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar pedido de upgrade de cargo!', desc: err.message });
    }
};

controllers.get = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await model.findOne({ where: { id_formando: id } });
        if (data) {
            res.status(200).json({ jaPediu: true });
        } else {
            res.status(404).json({ jaPediu: false });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao procurar pedido de upgrade de cargo!', desc: err.message });
    }
};

controllers.create = async (req, res) => {
    try {
        if (req.body) {
            const data = await model.create(req.body);
            res.status(201).json(data);
        } else {
            res.status(400).json({ erro: 'Erro ao criar pedido de upgrade de cargo!', desc: 'Corpo do pedido esta vazio.' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar pedido de upgrade de cargo!', desc: err.message });
    }
};

controllers.cancel = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await model.destroy({ where: { id_formando: id } });
    
        if (deleted) {
            res.status(200).json({ msg: 'Pedido de upgrade de cargo cancelado/a com sucesso!' });
        } else {
            res.status(404).json({ erro: 'Pedido de upgrade de cargo não foi cancelado/a!' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao cancelar o/a pedido de upgrade de cargo!', desc: err.message });
    }
};

controllers.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await model.findOne({ where: { id_pedidos_upgrade_cargo: id }});
        const deleted = await model.destroy({ where: { id_pedidos_upgrade_cargo: id } });
        const user = await utilizador.findOne({ where: { id_utilizador: pedido.id_formando } });
        if (user?.email) {
            await enviarEmailUpgradeRecusado(user.email);
        }
        if (deleted) {
            res.status(200).json({ msg: 'Pedido de upgrade de cargo apagado/a com sucesso!' });
        } else {
            res.status(404).json({ erro: 'Pedido de upgrade de cargo não foi apagado/a!' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao apagar o/a pedido de upgrade de cargo!', desc: err.message });
    }
};

module.exports = controllers;
