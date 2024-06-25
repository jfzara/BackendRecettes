require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.use(errorHandler);

sequelize.sync({ force: true }).then(() => { // Utilisez { force: true } pour recréer les tables (attention : cela supprime les données existantes)
  app.listen(3000, () => { // Écouter sur le port 3000 pour les requêtes HTTP
    console.log('Server is running on port 3000');
  });
});
