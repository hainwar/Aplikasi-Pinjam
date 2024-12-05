import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function DetailHistory({ route }) {
  const { id } = route.params; // Mendapatkan id dari params
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data berdasarkan ID
    const fetchDetailData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/peminjaman/${id}`);
        const data = await response.json();
        setDetailData(data); // Menyimpan data yang diterima
      } catch (error) {
        console.error("Error fetching detail data:", error);
      }
    };

    if (id) {
      fetchDetailData();
    }
  }, [id]);

  // Menampilkan loading sementara
  if (!detailData) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nama Peminjam: {detailData.name}</Text>
      <Text style={styles.text}>Alat yang Dipinjam: {detailData.alat}</Text>
      <Text style={styles.text}>Tanggal Peminjaman: {new Date(detailData.date).toLocaleDateString()}</Text>
      <Text style={styles.text}>Petugas: {detailData.petugas}</Text>
      {detailData.photo && (
        <Image
          source={{ uri: detailData.photo }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
});
