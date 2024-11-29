require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Menghapus useNewUrlParser dan useUnifiedTopology karena tidak diperlukan lagi
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Terhubung ke MongoDB Atlas');
  } catch (error) {
    console.error('Koneksi ke MongoDB gagal:', error.message);
    process.exit(1); // Keluar dari proses jika koneksi gagal
  }
};

module.exports = connectDB;
