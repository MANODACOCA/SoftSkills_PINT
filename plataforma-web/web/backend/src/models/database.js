require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
       host: process.env.DB_HOST,
       port: process.env.DB_PORT,
       dialect: process.env.DB_DIALECT,
    }
);

sequelize.authenticate()
    .then(()=> console.log('Conexão com base de dados realizada com sucesso!'))
    .catch(error=> console.log('Erro ao conectar com base de dados:', error));

module.exports = sequelize;