const Recipe = require('../models/recipe');

const createRecipe = async (req, res) => {
  const { name, ingredients, instructions, category, imageUrl } = req.body;
  try {
    const newRecipe = await Recipe.create({
      name,
      ingredients,
      instructions,
      category,
      imageUrl,
      userId: req.user.id, // Assurez-vous que req.user.id est défini via le middleware d'authentification
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    console.log('Fetching recipes...');
    const recipes = await Recipe.findAll({ where: { userId: req.user.id } });
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOne({ where: { id, userId: req.user.id } });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions, category, imageUrl } = req.body;
  try {
    const recipe = await Recipe.findOne({ where: { id, userId: req.user.id } });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    recipe.name = name;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.category = category;
    recipe.imageUrl = imageUrl;
    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOne({ where: { id, userId: req.user.id } });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    await recipe.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe };
