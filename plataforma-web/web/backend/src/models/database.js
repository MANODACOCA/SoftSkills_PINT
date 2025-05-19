require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
       host: process.env.DB_HOST,
       port: process.env.DB_PORT,
       dialect: process.env.DB_DIALECT
    }
);

sequelize.authenticate()
    .then(()=> console.log('Conexão com base de dados realizada com sucesso!'))
    .catch(error=> console.log('Erro ao conectar com base de dados:', error));

module.exports = sequelize;

/* const { Sequelize } = require('sequelize');

// Configuração direta (substitua com seus valores reais)
const sequelize = new Sequelize(
  'softskills',       // nome do banco de dados
  'postgres',         // usuário
  'postgres',         // senha
  {
    host: 'localhost', // endereço do servidor
    port: 5432,        // porta do PostgreSQL
    dialect: 'postgres',
    logging: false,    // desativa logs de SQL no console
    define: {
      timestamps: true // adiciona createdAt e updatedAt automaticamente
    }
  }
);

// Teste de conexão
sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao PostgreSQL com sucesso'))
  .catch(err => console.error('❌ Falha na conexão:', err));

module.exports = sequelize; */