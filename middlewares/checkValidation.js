// Importe del manejador de resultados 
const { validationResult } = require('express-validator');

// Middleware intermedio para comprobar si hay errores derivados de las validaciones anteriores
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    // Si hay errores, se detiene todo y se devuelve un código 400
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Si todo es correcto, se pasa al siguiente middleware o controlador
    next();
};

module.exports = checkValidation;