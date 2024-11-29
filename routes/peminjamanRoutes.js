const express = require('express');
const { createPeminjaman, getAllPeminjaman } = require('../controllers/peminjamanController');

const router = express.Router();

// Endpoint POST untuk membuat peminjaman
router.post('/', createPeminjaman);

// Endpoint GET untuk mendapatkan semua peminjaman
router.get('/', getAllPeminjaman);

module.exports = router;
