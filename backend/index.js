const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Importar las rutas
const routes = require('./routes/routes');

// Rutas principales
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación!');
});

// Rutas de la API
app.use('/api', routes);

// Puerto de escucha
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
