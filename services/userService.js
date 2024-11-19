const User = require('.../models/User');

// Crear usuario
exports.createUser = async (userData) => {
  return await User.create(userData);
};

// Modificar usuario
exports.updateUser = async (id, newData) => {
  return await User.update(newData, { where: { id } });
};

// Eliminar usuario
exports.deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

// Consultar usuario por ID
exports.getUserById = async (id) => {
  return await User.findByPk(id);
};