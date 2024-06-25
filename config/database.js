const { Sequelize } = require('sequelize');

// Crée une instance de Sequelize
const sequelize = new Sequelize('bvmk9uxv5t9nlp3jdbpd', 'uijcyzgobkiktddz', 'pxfLlz9wcstDCyDXH2sx', {
  host: 'bvmk9uxv5t9nlp3jdbpd-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  port: 3306,
  // Utilisez console.log pour le débogage
  logging: console.log, 
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('La connexion a été établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err.message);
  });

module.exports = sequelize;
