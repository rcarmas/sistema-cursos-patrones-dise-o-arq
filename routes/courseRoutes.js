const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Crear curso
router.post('/', async (req, res) => {
  const { title, description, creatorId } = req.body;
  try {
    const course = await Course.create({ title, description, creatorId });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Consultar curso
router.get('/:id', async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Curso no encontrado' });
  }
});

// Modificar curso
router.put('/:id', async (req, res) => {
  const { title, description, creatorId } = req.body;
  const course = await Course.findByPk(req.params.id);
  if (course) {
    course.title = title;
    course.description = description;
    course.creatorId = creatorId;
    await course.save();
    res.json(course);
  } else {
    res.status(404).json({ message: 'Curso no encontrado' });
  }
});

// Eliminar curso
router.delete('/:id', async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    await course.destroy();
    res.status(200).json({ message: 'Curso eliminado' });
  } else {
    res.status(404).json({ message: 'Curso no encontrado' });
  }
});

// Cambiar estado de curso
router.patch('/:id/status', async (req, res) => {
  const { state } = req.body;
  const course = await Course.findByPk(req.params.id);
  if (course) {
    course.state = state;
    await course.save();
    res.json(course);
  } else {
    res.status(404).json({ message: 'Curso no encontrado' });
  }
});

module.exports = router;