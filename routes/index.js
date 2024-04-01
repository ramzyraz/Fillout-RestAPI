const express = require('express');
const router = express.Router();
const formsController = require('../controllers');

router.get('/:formId/filteredResponses', formsController.getFilteredResponses);

module.exports = router;