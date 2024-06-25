const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET n\'est pas défini. Veuillez le définir dans votre fichier .env.');
}

// Inscription
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Le nom d\'utilisateur existe déjà' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur lors de l inscription :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l inscription', details: error.message });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Trouver l'utilisateur par nom d'utilisateur
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Comparer le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe invalide' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la connexion', details: error.message });
  }
};

module.exports = {
  register,
  login
};
