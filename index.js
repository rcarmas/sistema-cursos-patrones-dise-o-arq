const express = require('express');
const sequelize = require('./models');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.get('/', (req, res) => res.send('API de Sistema de Cursos'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));

// Sincronizar base de datos
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
