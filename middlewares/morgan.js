// Paquete morgan para el registro de solicitudes HTTP
const morgan = require('morgan');

// Token para obtener el hostname de la petición
morgan.token('host', (req) => req.hostname);

// Capturar y mostrar el body de la solicitud en formato JSON
morgan.token('body', (req) => {
    if (!req.body || Object.keys(req.body).length === 0) return '';
    return JSON.stringify(req.body);
});

//Limpiar la URL y enmascarar claves de API sensibles por seguridad
morgan.token('clean-url', (req) => {
    return req.originalUrl.replace(/(api_key|apikey)=[^&]*/gi, '$1=***');
});

module.exports = morgan;