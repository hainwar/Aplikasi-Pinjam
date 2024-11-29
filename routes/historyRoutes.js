const express = require('express');
const router = express.Router();
const { getHistory } = require('../controllers/historyController');

// Endpoint untuk mendapatkan riwayat berdasarkan userId
router.get('/:userId', getHistory);

module.exports = router;
