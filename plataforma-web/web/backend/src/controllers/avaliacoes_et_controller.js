const { where } = require("sequelize");
const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).avaliacoes_et;
const controllers = {};



controllers.list = async (req, res) => {
    const data = await model.findAll();
    res.status(200).json(data);
};

controllers.get = async (req, res) => {
    try {
        const { id_entrega_trabalho } = req.params;
        const data = await model.findOne({
            where: { id_entrega_trabalho_aet: id_entrega_trabalho }
        });
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ erro: 'Nota de trabalho nao encontrado/a!' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao procurar Nota de trabalho!', desc: err.message });
    }
};

controllers.create = async (req, res) => {
    try {
        if (req.body) {
            const data = await model.create(req.body);
            res.status(201).json(data);
        } else {
            res.status(400).json({ erro: 'Erro ao criar Nota de trabalho!', desc: 'Corpo do pedido esta vazio.' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar Nota de trabalho!', desc: err.message });
    }
};

controllers.update = async (req, res) => {
    try {
        if (req.body) {
            const { id_entrega_trabalho } = req.params;
            const [updated] = await model.update(req.body, { where: { id_entrega_trabalho_aet: id_entrega_trabalho } });
            if (updated > 0) {
                const modelUpdated = await model.findOne({ where: { id_entrega_trabalho_aet: id_entrega_trabalho } });
                res.status(200).json(modelUpdated);
            } else {
                res.status(404).json({ erro: 'Nota de trabalho nao foi atualizado/a!' });
            }
        } else {
            res.status(400).json({ erro: 'Erro ao atualizar o/a Nota de trabalho!', desc: 'Corpo do pedido esta vazio.' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar o/a Nota de trabalho!', desc: err.message });
    }
};

controllers.delete = async (req, res) => {
    try {
        const { id_entrega_trabalho } = req.params;
        const deleted = await model.destroy({ where: { id_entrega_trabalho_aet: id_entrega_trabalho } });
        if (deleted) {
            res.status(200).json({ msg: 'Nota de trabalho apagado/a com sucesso!' });
        } else {
            res.status(404).json({ erro: 'Nota de trabalho não foi apagado/a!' });
        }
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao apagar o/a Nota de trabalho!', desc: err.message });
    }
};

module.exports = controllers;
