// Importación de las funciones de validación de express-validator
const { body, query } = require('express-validator');

// Obtención o filtrado de autores por email
const validateGetAuthors = [
    query('email').optional().isEmail().withMessage('El email de consulta debe ser válido')
];

// Creación de un nuevo autor
const validateCreateAuthor = [
    body('name').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').isString().notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Debes proporcionar un email válido'),
    body('image').optional().isURL().withMessage('La imagen debe ser una URL válida')
];

// Para actualización de los datos de un autor
const validateUpdateAuthor = [
    body('email').isEmail().withMessage('Se requiere el email actual para identificar al autor'),
    body('newName').optional().isString(),
    body('newSurname').optional().isString(),
    body('newEmail').optional().isEmail().withMessage('El nuevo email debe ser válido')
];

// Eliminación de un autor
const validateDeleteAuthor = [
    body('email').isEmail().withMessage('Se requiere un email válido para borrar el autor')
];

module.exports = {
    validateGetAuthors,
    validateCreateAuthor,
    validateUpdateAuthor,
    validateDeleteAuthor
};