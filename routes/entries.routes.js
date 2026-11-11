const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entries.controller');
const checkValidation = require('../middlewares/checkValidation');

// Importe de cada validador para cada operación de entradas
const {
    validateGetEntries,
    validateCreateEntry,
    validateUpdateEntry,
    validateDeleteEntry
} = require('../middlewares/entries.validators');

// GET /api/entries (o GET /api/entries?email=...)
router.get('/', validateGetEntries, checkValidation, entriesController.getEntries);

// POST /api/entries
router.post('/', validateCreateEntry, checkValidation, entriesController.createEntry);

// PUT /api/entries
router.put('/', validateUpdateEntry, checkValidation, entriesController.updateEntry);

// DELETE /api/entries
router.delete('/', validateDeleteEntry, checkValidation, entriesController.deleteEntry);

module.exports = router;