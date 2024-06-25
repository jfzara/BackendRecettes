require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const errorHandler = require('./middlewares/errorHandler'); 

const app = express();
// Utilisation du middleware CORS 

app.use(cors());
app.use(express.json()); // Cette ligne est essentielle pour analyser les requêtes JSON
// Utilisation des routes pour les utilisateurs
app.use('/api/users', userRoutes);
// Utilisation des routes pour les recettes
app.use('/api/recipes', recipeRoutes);

// Utiliser le middleware errorHandler 
app.use(errorHandler);
// Synchronisation de la base de données avec Sequelize
//  { force: true } pour recréer les tables
sequelize.sync({ force: true }).then(() => { 
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
