
const sequelize = require("../models/database");
const initModels = require("../models/init-models");
const model = initModels(sequelize).likes_comentario;
const controllers = {};



controllers.list = async (req, res) => {
    const data = await model.findAll();
    res.status(200).json(data);
};

controllers.get = async (req, res) => {
    try {
        const { id_comentario, id_utilizador } = req.params;
        const data = await model.findOne({
            where: {
                id_comentario: id_comentario,
                id_utilizador: id_utilizador,
            }
        });
        
        if (data) {
            const deuLike = !!data;
            res.status(200).json(deuLike);
        } else {
            res.status(404).json({ erro: "Like comentario não encontrado/a!" });
        }
    } catch (err) {
        res.status(500).json({ erro: "Erro ao procurar Like comentario!", desc: err.message });
    }
};

controllers.create = async (req, res) => {
    try {
        if (req.body) {
            const data = await model.create(req.body);
            res.status(201).json(data);
        } else {
            res.status(400).json({ erro: "Erro ao criar Like comentario!", desc: "Corpo do pedido está vazio." });
        }
    } catch (err) {
        res.status(500).json({ erro: "Erro ao criar Like comentario!", desc: err.message });
    }
};

controllers.delete = async (req, res) => {
    try {
        const { id_comentario, id_utilizador } = req.body;

        if (!id_comentario || !id_utilizador) {
            return res.status(400).json({ erro: 'id_comentario e id_utilizador são obrigatórios para eliminar o like.' })
        }

        const deleted = await model.destroy({ where: { id_comentario, id_utilizador } }); 
        if (deleted) {
            res.status(200).json({ msg: "Like post apagado/a com sucesso!" });
        } else {
            res.status(404).json({ erro: "Like post não foi apagado/a!" });
        }
    } catch (err) {
        res.status(500).json({ erro: "Erro ao apagar o/a Like post!", desc: err.message });
    }
};

module.exports = controllers;


