const express = require('express');
const router = express.Router();
const Course = require('.../models/Course');

// Crear curso
router.post('/', async (req, res) => {
  const { title, description, creatorId } = req.body;
  const course = await Course.create({ title, description, creatorId });
  res.status(201).json(course);
});

// Consultar curso
router.get('/:id', async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  res.json(course);
});

module.exports = router;