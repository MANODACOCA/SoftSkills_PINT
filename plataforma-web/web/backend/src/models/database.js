require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'softskills',
    'postgres',
    'postgres',
    {
       host: 'localhost',
       port: 5432,
       dialect: 'postgres'
    }
);

sequelize.authenticate()
    .then(()=> console.log('Conexão com base de dados realizada com sucesso!'))
    .catch(error=> console.log('Erro ao conectar com base de dados:', error));

module.exports = sequelize;