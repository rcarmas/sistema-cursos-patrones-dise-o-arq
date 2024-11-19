const bcrypt = require('bcrypt');

// Encriptar una contraseña
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Comparar contraseñas
exports.comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};