const User = require('.../models/User');

// Crear usuario
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const newUser = await User.create({ firstName, lastName, email, password, role });
    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Consultar usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Modificar usuario
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const updatedUser = await user.update(req.body);
    res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};