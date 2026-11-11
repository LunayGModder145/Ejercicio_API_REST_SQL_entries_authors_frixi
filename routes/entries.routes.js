const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entries.controller');
const { body, query, validationResult } = require('express-validator');

// Middleware para capturar y responder con errores de validación
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// GET /api/entries (o GET /api/entries?email=...)
router.get('/', [
    query('email').optional().isEmail().withMessage('El email de filtro debe ser válido'),
    validarCampos
], entriesController.getEntries);

// POST /api/entries
router.post('/', [
    body('title').isString().notEmpty().withMessage('El título es obligatorio'),
    body('content').isString().notEmpty().withMessage('El contenido es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido del autor'),
    body('category').isString().notEmpty().withMessage('La categoría es obligatoria'),
    validarCampos
], entriesController.createEntry);

// PUT /api/entries
router.put('/', [
    body('title').isString().notEmpty().withMessage('Se requiere el título original para identificar la entrada'),
    body('newContent').isString().notEmpty().withMessage('El nuevo contenido es obligatorio'),
    body('newCategory').isString().notEmpty().withMessage('La nueva categoría es obligatoria'),
    validarCampos
], entriesController.updateEntry);

// DELETE /api/entries
router.delete('/', [
    body('title').isString().notEmpty().withMessage('Se requiere el título para eliminar la entrada'),
    validarCampos
], entriesController.deleteEntry);

module.exports = router;