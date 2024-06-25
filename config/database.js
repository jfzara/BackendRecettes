const { Sequelize } = require('sequelize');

// Crée une instance de Sequelize
const sequelize = new Sequelize('recipe_management', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
    // le logging sql pour le débogage
  logging: true,
 
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

