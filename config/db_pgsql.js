// Conector Pool de la librería pg y carga de variables de entorno
const { Pool } = require('pg');
require('dotenv').config();

// Parametros de conexión a la base de datos con variables de entorno
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

module.exports = pool;