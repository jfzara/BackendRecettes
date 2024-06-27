const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/recipes', authMiddleware, recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
