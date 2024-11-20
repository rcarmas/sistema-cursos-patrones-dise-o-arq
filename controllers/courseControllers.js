const Course = require('../models/Course');
const User = require('../models/User');

// Crear curso
exports.createCourse = async (req, res) => {
  const { title, description, creatorId } = req.body;

  try {
    const creator = await User.findByPk(creatorId);
    if (!creator || creator.role !== 'creator') {
      return res.status(400).json({ message: 'El creador no existe o no tiene permiso' });
    }

    const activeCourses = await Course.count({ where: { creatorId, state: 'active' } });
    if (activeCourses >= 2) {
      return res.status(400).json({ message: 'El creador ya tiene dos cursos activos' });
    }

    const newCourse = await Course.create({ title, description, creatorId });
    res.status(201).json({ message: 'Curso creado exitosamente', course: newCourse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Consultar curso por ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Modificar curso
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });

    const updatedCourse = await course.update(req.body);
    res.status(200).json({ message: 'Curso actualizado', course: updatedCourse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar curso
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });

    await course.destroy();
    res.status(200).json({ message: 'Curso eliminado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cambiar estado del curso
exports.changeCourseState = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });

    const { newState } = req.body;
    if (!['in_construction', 'active', 'inactive'].includes(newState)) {
      return res.status(400).json({ message: 'Estado no válido' });
    }

    course.state = newState;
    await course.save();
    res.status(200).json({ message: 'Estado del curso actualizado', course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};