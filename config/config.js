module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'vanilla_dev',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  test: {
    username: 'postgres',
    password: null,
    database: 'vanilla_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  production: {
    username: 'postgres',
    password: null,
    database: 'vanilla_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
  },
};
