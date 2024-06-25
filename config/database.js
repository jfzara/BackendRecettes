const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_ADDON_DB, process.env.MYSQL_ADDON_USER, process.env.MYSQL_ADDON_PASSWORD, {
  host: process.env.MYSQL_ADDON_HOST,
  dialect: 'mysql',
  port: process.env.MYSQL_ADDON_PORT,
  logging: console.log, // Utiliser console.log pour le logging SQL
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
  });

module.exports = sequelize;



