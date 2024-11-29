const Peminjaman = require('../models/return');

exports.processReturn = async (req, res) => {
    try {
        const { peminjamanId } = req.body;

        if (!peminjamanId) {
            return res.status(400).json({ message: 'ID peminjaman wajib diisi.' });
        }

        const peminjaman = await Peminjaman.findById(peminjamanId);

        if (!peminjaman) {
            return res.status(404).json({ message: 'Data peminjaman tidak ditemukan.' });
        }

        if (peminjaman.isReturned) {
            return res.status(400).json({ message: 'Barang sudah dikembalikan.' });
        }

        peminjaman.isReturned = true;
        peminjaman.returnedAt = new Date();
        await peminjaman.save();

        res.status(200).json({ message: 'Barang berhasil dikembalikan.', data: peminjaman });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};
