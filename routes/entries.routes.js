const router = require('express').Router();
const entriesController = require('../controllers/entries.controller');

// Rutas para /api/entries
router.get('/', entriesController.getEntries);
router.post('/', entriesController.createEntry);

module.exports = router;