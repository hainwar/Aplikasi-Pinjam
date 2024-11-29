const mongoose = require('mongoose');

// Skema peminjaman
const peminjamanSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    item: { type: String, required: true },
    borrowedAt: { type: Date, default: Date.now },
    returnedAt: { type: Date }, // Tanggal pengembalian
    isReturned: { type: Boolean, default: false }, // Status pengembalian
});

// Cek apakah model sudah ada sebelum mendefinisikannya
module.exports = mongoose.models.Peminjaman || mongoose.model('Peminjaman', peminjamanSchema);
