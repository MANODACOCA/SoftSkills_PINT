const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto(
  'postgres',
  'postgres.edfeevrkapdtnecarkii',
  'l7wrdrppr4CQ7ys1',
  {
    host: 'aws-0-eu-north-1.pooler.supabase.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    directory: './src/models',
    additional: { timestamps: false },
    schema: 'public',
  }
);

auto.run(err => {
  if (err) {
    console.error('Erro ao gerar models:', err);
    return;
  }
  console.log('Models gerados com sucesso!');
});
