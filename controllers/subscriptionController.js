const Subscription = require('../models/Subscription');
const Course = require('../models/Course');
const User = require('../models/User');

// Suscribir usuario a un curso
exports.subscribeToCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const course = await Course.findByPk(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'Usuario o curso no encontrado' });
    }

    if (user.role !== 'consumer') {
      return res.status(400).json({ message: 'El usuario no tiene permisos para suscribirse' });
    }

    const existingSubscription = await Subscription.findOne({ where: { userId, courseId } });
    if (existingSubscription) {
      return res.status(400).json({ message: 'El usuario ya está suscrito a este curso' });
    }

    const subscription = await Subscription.create({ userId, courseId });
    res.status(201).json({ message: 'Suscripción creada exitosamente', subscription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cancelar suscripción
exports.cancelSubscription = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const subscription = await Subscription.findOne({ where: { userId, courseId } });
    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' });
    }

    await subscription.destroy();
    res.status(200).json({ message: 'Suscripción cancelada exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Consultar suscripción
exports.getSubscription = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const subscription = await Subscription.findOne({ where: { userId, courseId } });
    if (!subscription) {
      return res.status(404).json({ message: 'Suscripción no encontrada' });
    }

    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};