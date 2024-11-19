const Course = require('../models/Course');

// Crear curso
exports.createCourse = async (courseData) => {
  return await Course.create(courseData);
};

// Modificar curso
exports.updateCourse = async (id, newData) => {
  return await Course.update(newData, { where: { id } });
};

// Eliminar curso
exports.deleteCourse = async (id) => {
  return await Course.destroy({ where: { id } });
};

// Consultar curso por ID
exports.getCourseById = async (id) => {
  return await Course.findByPk(id);
};

// Cambiar estado del curso
exports.changeCourseStatus = async (id, newStatus) => {
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Curso no encontrado.');
  course.status = newStatus;
  return await course.save();
};