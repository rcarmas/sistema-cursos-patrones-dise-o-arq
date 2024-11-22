const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Suscribir a un curso
router.post('/', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const subscription = await Subscription.create({ userId, courseId });
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancelar suscripción a un curso
router.delete('/', async (req, res) => {
  const { userId, courseId } = req.body;
  const subscription = await Subscription.findOne({ where: { userId, courseId } });
  if (subscription) {
    await subscription.destroy();
    res.status(200).json({ message: 'Suscripción cancelada' });
  } else {
    res.status(404).json({ message: 'Suscripción no encontrada' });
  }
});

// Consultar suscripción
router.get('/:userId/:courseId', async (req, res) => {
  const { userId, courseId } = req.params;
  const subscription = await Subscription.findOne({ where: { userId, courseId } });
  if (subscription) {
    res.json(subscription);
  } else {
    res.status(404).json({ message: 'Suscripción no encontrada' });
  }
});

module.exports = router;