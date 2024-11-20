const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Course = sequelize.define('Course', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  state: { type: DataTypes.ENUM('in_construction', 'active', 'inactive'), defaultValue: 'in_construction' },
  creatorId: { type: DataTypes.UUID, references: { model: User, key: 'id' } }
});

User.hasMany(Course, { as: 'courses', foreignKey: 'creatorId' });
Course.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });

module.exports = Course;
