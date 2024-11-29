const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Controller untuk registrasi
const register = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  // Validasi input
  if (!email || !username || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Semua field wajib diisi.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password dan konfirmasi password tidak cocok.' });
  }

  try {
    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan.' });
    }

    // Cek apakah username sudah digunakan
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username sudah digunakan.' });
    }

    // Simpan pengguna baru
    const user = new User({
      email: email.toLowerCase(),
      username,
      password,
    });
    await user.save();
    console.log('User registered:', user); // Debugging log

    res.status(201).json({ message: 'Registrasi berhasil.' });
  } catch (error) {
    console.error('Error during registration:', error.message); // Debugging log
    res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
  }
};

// Controller untuk login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi.' });
  }

  try {
    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('User not found for email:', email.toLowerCase()); // Debugging log
      return res.status(400).json({ message: 'Email atau password salah.' });
    }

    // Bandingkan password
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password comparison result:', isPasswordValid); // Debugging log

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email atau password salah.' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token); // Debugging log

    res.status(200).json({ message: 'Login berhasil.', token });
  } catch (error) {
    console.error('Error during login:', error.message); // Debugging log
    res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
  }
};

module.exports = { register, login };
