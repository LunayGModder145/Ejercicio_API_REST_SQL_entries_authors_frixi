const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.controller');
const { body, query, validationResult } = require('express-validator');

// Middleware para manejar errores de validación
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', [
    query('email').optional().isEmail().withMessage('El email de consulta debe ser válido'),
    validarCampos
], authorsController.getAuthors);

router.post('/', [
    body('name').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').isString().notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Debes proporcionar un email válido'),
    body('image').optional().isURL().withMessage('La imagen debe ser una URL válida'),
    validarCampos
], authorsController.createAuthor);

router.put('/', [
    body('email').isEmail().withMessage('Se requiere el email actual para identificar al autor'),
    body('newName').optional().isString(),
    body('newSurname').optional().isString(),
    body('newEmail').optional().isEmail().withMessage('El nuevo email debe ser válido'),
    validarCampos
], authorsController.updateAuthor);

router.delete('/', [
    body('email').isEmail().withMessage('Se requiere un email válido para borrar el autor'),
    validarCampos
], authorsController.deleteAuthor);

module.exports = router;