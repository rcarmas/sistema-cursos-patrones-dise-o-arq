// Middleware para verificar el rol del usuario
exports.checkRole = (requiredRole) => {
    return (req, res, next) => {
      const { role } = req.user;
      if (role !== requiredRole) {
        return res.status(403).json({ message: 'Acceso denegado: No tienes el rol requerido.' });
      }
      next();
    };
  };