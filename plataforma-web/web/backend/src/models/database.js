require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});

sequelize.authenticate()
    .then(()=> console.log('Conexão com base de dados realizada com sucesso!'))
    .catch(error=> console.log('Erro ao conectar com base de dados:', error));

module.exports = sequelize;