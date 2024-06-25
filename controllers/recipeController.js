const Recipe = require('../models/recipe');
const User = require('../models/user');

// Create a new recipe
exports.createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, instructions, category, imageUrl, userId } = req.body;

     // Valider l'ID de l'utilisateur
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    // Créer une nouvelle recette
    const newRecipe = await Recipe.create({
      name,
      ingredients,
      instructions,
      category,
      imageUrl,
      userId
    });

    res.status(201).json(newRecipe);
  } catch (error) {
	//Passer l'erreur au middleware de gestion des erreurs

    next(error);
  }
};

//Récupération de Toutes les Recettes pour un Utilisateur Spécifique
exports.getRecipes = async (req, res, next) => {
  try {
    const { userId } = req.params;

   // Valider l'ID de l'utilisateur
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

   // Récupérer les recettes
    const recipes = await Recipe.findAll({ where: { userId } });
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

// Mise à jour d'une recette 
exports.updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, ingredients, instructions, category, imageUrl, userId } = req.body;

    // Valider l'ID de l'utilisateur
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

     // Trouver la recette par ID
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      const error = new Error('Recipe not found');
      error.status = 404;
      throw error;
    }

     // Vérifier que la recette appartient à l'utilisateur
    if (recipe.userId !== userId) {
      const error = new Error('You do not have permission to update this recipe');
      error.status = 403;
      throw error;
    }

    // mettre à jour la recette
    recipe.name = name;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.category = category;
    recipe.imageUrl = imageUrl;

    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
	// Passer l'erreur au middleware de gestion des erreurs
    next(error);
  }
};

// Suppression d'une recette
exports.deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Valider l'ID de l'utilisateur
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    
    // Trouver la recette par ID
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      const error = new Error('Recipe not found');
      error.status = 404;
      throw error;
    }

    // Vérifier que la recette appartient à l'utilisateur
    if (recipe.userId !== userId) {
      const error = new Error('You do not have permission to delete this recipe');
      error.status = 403;
      throw error;
    }

    
    // Supprimer la recette
    await recipe.destroy();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
