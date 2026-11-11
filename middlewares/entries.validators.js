const { body, query } = require('express-validator');

const validateGetEntries = [
    query('email').optional().isEmail().withMessage('El email de filtro debe ser válido')
];

const validateCreateEntry = [
    body('title').isString().notEmpty().withMessage('El título es obligatorio'),
    body('content').isString().notEmpty().withMessage('El contenido es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido del autor'),
    body('category').isString().notEmpty().withMessage('La categoría es obligatoria')
];

const validateUpdateEntry = [
    body('title').isString().notEmpty().withMessage('Se requiere el título original para identificar la entrada'),
    body('newContent').isString().notEmpty().withMessage('El nuevo contenido es obligatorio'),
    body('newCategory').isString().notEmpty().withMessage('La nueva categoría es obligatoria')
];

const validateDeleteEntry = [
    body('title').isString().notEmpty().withMessage('Se requiere el título para eliminar la entrada')
];

module.exports = {
    validateGetEntries,
    validateCreateEntry,
    validateUpdateEntry,
    validateDeleteEntry
};