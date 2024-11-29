import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setMessage('Semua field wajib diisi.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Password dan konfirmasi password tidak cocok.');
      return;
    }

    try {
      const response = await fetch('https://redesigned-spoon-r4ggj6xwgp453w5r4-3000.app.github.dev/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, confirmPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setTimeout(() => {
          navigation.navigate('Login'); // Navigasi ke halaman Login
        }, 2000);
      } else {
        setMessage(result.message || 'Registrasi gagal.');
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register for IT Inventori</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        autoCapitalize="none"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      {message ? (
        <Text
          style={[
            styles.message,
            { color: message.includes('berhasil') ? 'green' : 'red' },
          ]}
        >
          {message}
        </Text>
      ) : null}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
        <Text style={styles.loginLink}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0070B8',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#001F3F',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  loginLink: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
});

export default Register;
