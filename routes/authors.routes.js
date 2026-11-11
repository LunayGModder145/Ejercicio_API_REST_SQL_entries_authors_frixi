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

router.get('/', validateGetAuthors, checkValidation, authorsController.getAuthors);

router.post('/', validateCreateAuthor, checkValidation, authorsController.createAuthor);

router.put('/', validateUpdateAuthor, checkValidation, authorsController.updateAuthor);

router.delete('/', validateDeleteAuthor, checkValidation, authorsController.deleteAuthor);

module.exports = router;