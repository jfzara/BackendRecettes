const express = require('express');
// Importation des contrôleurs pour les utilisateurs 
const { register, login } = require('../controllers/userController');
const router = express.Router();
//route POST pour l'inscription des utilisateur
router.post('/register', register);
//la route POST pour la connexion des utilisateurs
router.post('/login', login);

module.exports = router;

