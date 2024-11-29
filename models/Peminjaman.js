const mongoose = require('mongoose');

const PeminjamanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alat: { type: String, required: true },
  date: { type: Date, required: true },
  petugas: { type: String, required: true },
  photo: { type: String, required: true },
});

module.exports = mongoose.model('Peminjaman', PeminjamanSchema);
