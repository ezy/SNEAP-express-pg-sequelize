const config = {
  dev: 'development',
  test: 'test',
  prod: 'production',
  port: process.env.PORT || 4040,
  expireTime: '7d',
  jwtSecret: process.env.JWT || 'labor_risque_pewter_nisei',
};

// Setting environment variable
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

module.exports = config;
