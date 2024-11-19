const express = require('express');
const router = express.Router();
const User = require('.../models/User');

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
  res.json(user);
});

module.exports = router;
