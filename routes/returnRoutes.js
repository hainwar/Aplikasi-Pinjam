const express = require('express');
const router = express.Router();
const { processReturn } = require('../controllers/returnController');

// Endpoint untuk pengembalian
router.post('/return', processReturn);

module.exports = router;
