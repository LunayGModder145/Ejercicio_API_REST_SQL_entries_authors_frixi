const { body, query } = require('express-validator');

const validateGetAuthors = [
    query('email').optional().isEmail().withMessage('El email de consulta debe ser válido')
];

const validateCreateAuthor = [
    body('name').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').isString().notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Debes proporcionar un email válido'),
    body('image').optional().isURL().withMessage('La imagen debe ser una URL válida')
];

const validateUpdateAuthor = [
    body('email').isEmail().withMessage('Se requiere el email actual para identificar al autor'),
    body('newName').optional().isString(),
    body('newSurname').optional().isString(),
    body('newEmail').optional().isEmail().withMessage('El nuevo email debe ser válido')
];

const validateDeleteAuthor = [
    body('email').isEmail().withMessage('Se requiere un email válido para borrar el autor')
];

module.exports = {
    validateGetAuthors,
    validateCreateAuthor,
    validateUpdateAuthor,
    validateDeleteAuthor
};