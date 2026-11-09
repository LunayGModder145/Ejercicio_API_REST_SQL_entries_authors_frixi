const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entries.controller');

router.get('/', entriesController.getEntries);
router.post('/', entriesController.createEntry);
router.put('/', entriesController.updateEntry);
router.delete('/', entriesController.deleteEntry);

module.exports = router;