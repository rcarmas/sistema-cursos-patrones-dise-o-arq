const Subscription = require('../models/Subscription');

// Suscribir a un curso
exports.subscribeToCourse = async (userId, courseId) => {
  return await Subscription.create({ userId, courseId });
};

// Cancelar suscripción
exports.cancelSubscription = async (userId, courseId) => {
  return await Subscription.destroy({ where: { userId, courseId } });
};

// Consultar suscripción
exports.getSubscription = async (userId, courseId) => {
  return await Subscription.findOne({ where: { userId, courseId } });
};