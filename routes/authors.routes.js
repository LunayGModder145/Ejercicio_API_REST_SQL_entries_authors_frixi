const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.controller');

router.get('/', authorsController.getAuthors);
router.post('/', authorsController.createAuthor);
router.put('/', authorsController.updateAuthor);
router.delete('/', authorsController.deleteAuthor);

module.exports = router;