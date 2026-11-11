// Importe de modulos, dependencias de Express y rutas
const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.controller');
const checkValidation = require('../middlewares/checkValidation');
const {
    validateGetAuthors,
    validateCreateAuthor,
    validateUpdateAuthor,
    validateDeleteAuthor
} = require('../middlewares/authors.validators');

// Definición de rutas HTTP para la gestión de autores con validaciones
router.get('/', validateGetAuthors, checkValidation, authorsController.getAuthors);

router.post('/', validateCreateAuthor, checkValidation, authorsController.createAuthor);

router.put('/', validateUpdateAuthor, checkValidation, authorsController.updateAuthor);

router.delete('/', validateDeleteAuthor, checkValidation, authorsController.deleteAuthor);

module.exports = router;