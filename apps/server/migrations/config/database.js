const fs = require('fs');

module.exports = {
  development: {
    username: 'postgres',
    password: 'adc300',
    database: 'quan_ly_nha_thuoc',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.DB_PRODUCT_USER,
    password: process.env.DB_PRODUCT_PASSWORD,
    database: process.env.DB_PRODUCT_DATABASE,
    host: process.env.DB_PRODUCT_HOST,
    port: process.env.DB_PRODUCT_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt'),
      // },
    },
  },
};