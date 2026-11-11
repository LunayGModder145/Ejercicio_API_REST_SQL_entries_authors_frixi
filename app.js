// Importación de dependencias principales
const express = require('express');
const morgan = require('./middlewares/morgan'); // O deja 'morgan' normal si prefieres 'dev'
const app = express();
const port = process.env.PORT || 3000;

// Importar rutas
const entriesRoutes = require('./routes/entries.routes');
const authorsRoutes = require('./routes/authors.routes');

// Middlewares
app.use(morgan('[:date[iso]] :method :clean-url :status - :body')); // O app.use(morgan('dev'))
app.use(express.json());

// Uso de rutas
app.use('/api/entries', entriesRoutes);
app.use('/api/authors', authorsRoutes);

// Ruta por defecto para controlar endpoints no encontrados (con error 404)
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;