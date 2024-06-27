const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Database Host:', process.env.DB_HOST);
console.log('Database User:', process.env.DB_USER);
console.log('Database Name:', process.env.DB_NAME);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

module.exports = sequelize;

