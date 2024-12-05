const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const path = require('path');
const Peminjaman = require('../models/Peminjaman');

// Konfigurasi penyimpanan file dengan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pastikan folder 'uploads' sudah ada
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Menambahkan timestamp di nama file untuk menghindari duplikat
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });  // Inisialisasi multer dengan konfigurasi penyimpanan

// GET semua peminjaman
router.get('/', async (req, res) => {
  try {
    const peminjamans = await Peminjaman.find();
    res.status(200).json(peminjamans);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data.', error: error.message });
  }
});

// POST peminjaman baru
// POST peminjaman baru
router.post(
  '/',
  upload.single('photo'),
  [
    check('name', 'Nama wajib diisi').notEmpty(),
    check('alat', 'Nama alat wajib diisi').notEmpty(),
    check('date', 'Tanggal wajib diisi').notEmpty(),
    check('petugas', 'Nama petugas wajib diisi').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, alat, date, petugas } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : null;

      const peminjaman = new Peminjaman({ name, alat, date, petugas, photo });

      // Simpan peminjaman ke database
      await peminjaman.save();

      // Menambahkan pesan sukses di terminal
      console.log(`Data peminjaman berhasil disimpan: ${name}, ${alat}, ${date}, ${petugas}`);

      // Mengirimkan response ke client
      res.status(201).json({ message: 'Data peminjaman berhasil disimpan.' });
    } catch (error) {
      res.status(500).json({ message: 'Gagal menyimpan data.', error: error.message });
    }
  }
);


module.exports = router;
