const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Importar rutas
const entriesRoutes = require('./routes/entries.routes');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Uso de rutas
app.use('/api/entries', entriesRoutes);

// Ruta por defecto para controlar endpoints no encontrados (con error 404)
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;