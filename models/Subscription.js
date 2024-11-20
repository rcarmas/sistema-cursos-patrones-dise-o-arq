const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Course = require('./Course');

const Subscription = sequelize.define('Subscription', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, references: { model: User, key: 'id' } },
  courseId: { type: DataTypes.UUID, references: { model: Course, key: 'id' } }
});

User.belongsToMany(Course, { through: Subscription, as: 'subscriptions' });
Course.belongsToMany(User, { through: Subscription, as: 'subscribers' });

module.exports = Subscription;
