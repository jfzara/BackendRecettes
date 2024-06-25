const { Sequelize } = require('sequelize');

// Crée une instance de Sequelize
const sequelize = new Sequelize('bvmk9uxv5t9nlp3jdbpd', 'uijcyzgobkiktddz', 'pxfLlz9wcstDCyDXH2sx', {
  host: 'bvmk9uxv5t9nlp3jdbpd-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  port: 3306,
  logging: console.log, // Utilisez console.log pour le débogage
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
