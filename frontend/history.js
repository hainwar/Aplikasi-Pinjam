import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Data() {
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchHistory = async () => {
      const storedData = await AsyncStorage.getItem('historyData');
      if (storedData) {
        setHistory(JSON.parse(storedData));
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (index) => {
    let updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    await AsyncStorage.setItem('historyData', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const handleEdit = (index) => {
    const dataToEdit = history[index];
    navigation.navigate('Peminjaman', { dataToEdit, index });
  };

  const handleReturn = async (index) => {
    let updatedHistory = [...history];
    const currentDate = new Date().toLocaleDateString(); // Mendapatkan tanggal saat ini
    updatedHistory[index].status = 'Telah Dikembalikan';
    updatedHistory[index].returnDate = currentDate; // Menyimpan tanggal pengembalian
    await AsyncStorage.setItem('historyData', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  return (
    <View style={styles.container}>
      {/* Header Teks di atas tabel */}
      <View style={styles.header}>
        <Text style={styles.title}>Data Peminjaman</Text>
        <Text style={styles.subtitle}>Berikut adalah daftar peminjaman yang telah diajukan oleh peminjam.</Text>
      </View>

      {/* Tabel */}
      {history.length > 0 ? (
        <ScrollView style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Nama Peminjam</Text>
            <Text style={styles.tableHeaderText}>Nama Alat</Text>
            <Text style={styles.tableHeaderText}>Tanggal Peminjaman</Text>
            <Text style={styles.tableHeaderText}>Nama Petugas</Text>
            <Text style={styles.tableHeaderText}>Foto</Text>
            <Text style={styles.tableHeaderText}>Tanggal Pengembalian</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
            <Text style={styles.tableHeaderText}>Aksi</Text>
          </View>
          
          {/* Data Tabel */}
          {history.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.alat}</Text>
              <Text style={styles.tableCell}>{item.date}</Text>
              <Text style={styles.tableCell}>{item.petugas}</Text>
              
              {/* Menampilkan foto jika ada */}
              <View style={styles.tableCell}>
                {item.photo ? (
                  <Image source={{ uri: item.photo }} style={styles.image} />
                ) : (
                  <Text>--</Text>
                )}
              </View>

              {/* Tanggal Pengembalian */}
              <Text style={styles.tableCell}>
                {item.status === 'Telah Dikembalikan' ? item.returnDate : '-'}
              </Text>

              {/* Status */}
              <Text style={styles.tableCell}>{item.status || 'Belum Dikembalikan'}</Text>

              {/* Tombol Aksi: Edit, Delete, dan Kembalikan dalam satu kolom */}
              <View style={styles.tableCell}>
                <View style={styles.actionButtons}>
                  {/* Tombol Edit */}
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEdit(index)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>

                  {/* Tombol Delete */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(index)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>

                  {/* Tombol Kembalikan */}
                  {item.status !== 'Telah Dikembalikan' && (
                    <TouchableOpacity
                      style={styles.returnButton}
                      onPress={() => handleReturn(index)}
                    >
                      <Text style={styles.returnButtonText}>Kembalikan</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>Belum ada data peminjaman.</Text>
      )}

      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>Kembali ke Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0070B8',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#001F3F',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
  },
  tableContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0070B8',
    paddingVertical: 12,
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  actionButtons: {
    flexDirection: 'column', // Ubah jadi kolom
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  editButton: {
    backgroundColor: 'orange',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5, // Menambahkan jarak vertikal antar tombol
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5, // Menambahkan jarak vertikal antar tombol
  },
  returnButton: {
    backgroundColor: 'green',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5, // Menambahkan jarak vertikal antar tombol
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  returnButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#001F3F',
    padding: 20,
    width: '120%',
    alignSelf: 'center',
    top: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 16,
  },
});
