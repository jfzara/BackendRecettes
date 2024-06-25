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

// Utiliser le middleware errorHandler après les routes
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
 // force: true  pour recréer les tables 
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
