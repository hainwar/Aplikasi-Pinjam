exports.getHistory = async (req, res) => {
    try {
        const { userId } = req.params; // Ambil userId dari parameter URL

        // Validasi userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID tidak diberikan.' });
        }

        // Query database untuk riwayat peminjaman
        const history = await Peminjaman.find({ user: userId }).sort({ borrowedAt: -1 });

        if (!history || history.length === 0) {
            return res.status(404).json({ message: 'Tidak ada riwayat ditemukan.' });
        }

        res.status(200).json({
            message: 'Riwayat berhasil diambil.',
            data: history,
        });
    } catch (error) {
        console.error('Error saat mengambil riwayat:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};
