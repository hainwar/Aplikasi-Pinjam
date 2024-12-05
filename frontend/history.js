import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Button, TouchableOpacity } from 'react-native';

export default function History({ navigation }) {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [filteredPeminjaman, setFilteredPeminjaman] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Ambil data peminjaman dari API
  useEffect(() => {
    fetch('http://localhost:3000/api/peminjaman')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data diterima: ', data); // Memeriksa data yang diterima
        setPeminjamanList(data);
        setFilteredPeminjaman(data); // Menyimpan data awal ke filteredPeminjaman
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    console.log('Mencari dengan kata kunci: ', searchTerm); // Memeriksa kata kunci pencarian
    if (!searchTerm.trim()) {
      setFilteredPeminjaman(peminjamanList); // Jika pencarian kosong, tampilkan semua data
      return;
    }

    // Filter data berdasarkan pencarian
    const filtered = peminjamanList.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alat.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    console.log('Hasil pencarian: ', filtered); // Menampilkan hasil pencarian
    setFilteredPeminjaman(filtered); // Update daftar yang ditampilkan dengan hasil pencarian
  };

  return (
    <View style={styles.container}>
      {/* Kolom Pencarian */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name or Item"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)} // Mengupdate nilai pencarian
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredPeminjaman.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Nama Peminjam: {item.name}</Text>
            <Text style={styles.text}>Nama Alat: {item.alat}</Text>
            <Text style={styles.text}>Tanggal: {new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.text}>Petugas: {item.petugas}</Text>
            {item.photo && (
              <Image source={{ uri: `http://localhost:3000/${item.photo}` }} style={styles.image} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Tombol Kembali */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{ color: '#778899', padding:5, fontSize:16, fontWeight: 'bold' }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between', // Agar elemen-elemen di dalam container memiliki jarak yang baik
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  scrollContainer: { 
    padding: 20,
    flexGrow: 1, // Memastikan scrollview bisa tumbuh mengisi ruang kosong
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  text: { fontSize: 16, marginBottom: 5 },
  image: { width: 100, height: 100, borderRadius: 8, marginTop: 10 },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
});
