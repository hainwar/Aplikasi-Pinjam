const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const peminjamanRoutes = require('./routes/peminjamanRoutes');
const authRoutes = require('./routes/authRoutes');
const returnRoutes = require('./routes/returnRoutes'); // Import rute pengembalian
const authenticate = require('./config/auth'); // Middleware autentikasi
const path = require('path'); // Untuk menyajikan file statis
const historyRoutes = require('./routes/historyRoutes');
const cors = require('cors'); // Tambahkan ini

const app = express();
const PORT = process.env.PORT || 3000;

// Koneksi ke MongoDB
connectDB();

// Middleware untuk parsing JSON dan URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors());

// Menyajikan file statis untuk gambar yang di-upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Tambahkan log untuk memeriksa semua request masuk
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  next();
});

// Rute dasar untuk menguji server
app.get('/', (req, res) => {
  res.send('Server berjalan!');
});

// Endpoint untuk memeriksa status server dan koneksi MongoDB
app.get('/api/check', (req, res) => {
  const connectionStatus = mongoose.connection.readyState;
  res.status(connectionStatus === 1 ? 200 : 500).json({
    message: connectionStatus === 1
      ? "Server dan koneksi MongoDB berjalan dengan baik."
      : "Koneksi ke MongoDB bermasalah.",
    mongoStatus: connectionStatus === 1 ? "connected" : "disconnected",
  });
});

// Rute autentikasi
app.use('/api/auth', authRoutes);

// Rute peminjaman
app.use('/api/peminjaman', peminjamanRoutes);

// Rute pengembalian
app.use('/api/return', returnRoutes); // Tambahkan rute pengembalian

// Rute riwayat peminjaman
app.use('/api/history', historyRoutes);

// Penanganan rute yang tidak ditemukan
app.use((req, res) => {
  console.log('Rute tidak ditemukan:', req.method, req.url);
  res.status(404).json({ message: 'Rute tidak ditemukan.' });
});

// Penanganan kesalahan global
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan server.', error: err.message });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
