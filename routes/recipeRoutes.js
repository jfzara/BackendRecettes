const express = require('express');
const { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const router = express.Router();

router.post('/', createRecipe); // Pour ajouter une recette
router.get('/', getRecipes); // Pour récupérer toutes les recettes
router.get('/:id', getRecipe); // Pour récupérer une recette spécifique
router.put('/:id', updateRecipe); // Pour mettre à jour une recette
router.delete('/:id', deleteRecipe); // Pour supprimer une recette

module.exports = router;


