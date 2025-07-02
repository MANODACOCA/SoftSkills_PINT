const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto('pint_2024_2025', 'pint_2024_2025_user', 'cssPYwDMn3hKmWlgMhl6UbiwQDRJSXkL', {
  host: 'dpg-d1d83tmr433s73eve4d0-a.oregon-postgres.render.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  directory: './src/models',
  additional: {
    timestamps: false,
  },
});

auto.run(err => {
  if (err) {
    console.error('Erro ao gerar models:', err);
    return;
  }
  console.log('Models gerados com sucesso!');
});
