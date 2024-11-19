const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

// Middleware para autenticar el token JWT
exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado: No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Añadimos la información del usuario al request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};