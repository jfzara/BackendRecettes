const express = require('express');
// Importation des contrôleurs pour les recettes
const { createRecipe, getRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
// Importation du middleware d'authentification
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
// Route pour créer une nouvelle recette
router.post('/', authenticateToken, createRecipe);
// Route pour récupérer toutes les recettes d'un utilisateur spécifique
router.get('/:userId', authenticateToken, getRecipes);
// Route pour mettre à jour une recette existante
router.put('/:id', authenticateToken, updateRecipe);
// Route pour supprimer une recette existante
router.delete('/:id', authenticateToken, deleteRecipe);

module.exports = router;


