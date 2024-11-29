const Peminjaman = require('../models/Peminjaman');

// Membuat peminjaman baru
exports.createPeminjaman = async (req, res) => {
  const { name, alat, date, petugas, photo } = req.body;

  if (!name || !alat || !date || !petugas || !photo) {
    return res.status(400).json({ message: 'Semua kolom wajib diisi.' });
  }

  try {
    const peminjaman = new Peminjaman({ name, alat, date, petugas, photo });
    await peminjaman.save();
    res.status(201).json({ message: 'Peminjaman berhasil disimpan.', peminjaman });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data.', error });
  }
};

// Mengambil semua data peminjaman
exports.getAllPeminjaman = async (req, res) => {
  try {
    const peminjaman = await Peminjaman.find();
    res.status(200).json(peminjaman);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.', error });
  }
};
