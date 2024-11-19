const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

// Generar un token
exports.generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verificar un token
exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};