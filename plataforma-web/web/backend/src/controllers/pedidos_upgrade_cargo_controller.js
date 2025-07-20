const sequelize = require("../models/database");
const initModels = require("../models/init-models");
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
                                [sequelize.col('email'), 'email']
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

controllers.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await model.destroy({ where: { id_pedidos_upgrade_cargo: id } });
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
