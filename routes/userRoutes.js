const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Crear usuario
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const user = await User.create({ firstName, lastName, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Consultar usuario
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// Modificar usuario
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const user = await User.findByPk(req.params.id);
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.role = role;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado' });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

module.exports = router;