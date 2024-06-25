require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const errorHandler = require('./middlewares/errorHandler'); // Importer le middleware

const app = express();

app.use(cors());
app.use(express.json()); // Cette ligne est essentielle pour analyser les requêtes JSON

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Utiliser le middleware errorHandler après les routes
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => { // Utiliser { force: true } pour recréer les tables (Attention: cela supprime les données existantes)
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
