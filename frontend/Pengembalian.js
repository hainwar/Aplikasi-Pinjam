import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function Pengembalian() {
  const [name, setName] = useState('');
  const [alat, setAlat] = useState('');
  const [returnDate, setReturnDate] = useState(new Date());
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Izin Kamera Ditolak", "Aplikasi memerlukan akses ke kamera untuk mengambil foto.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!name) tempErrors.name = true;
    if (!alat) tempErrors.alat = true;
    if (!returnDate) tempErrors.returnDate = true;
    if (!photo) tempErrors.photo = true;
    setErrors(tempErrors);
    
    return Object.keys(tempErrors).length === 0;
  };

  const handleKembalikan = () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Semua kolom wajib diisi sebelum melanjutkan.');
      return;
    }

    // Data pengembalian berhasil disimpan, lalu menuju ke halaman data peminjaman dan pengembalian
    Alert.alert('Sukses', 'Barang berhasil dikembalikan.');

    // Arahkan kembali ke halaman Data Peminjaman dan Pengembalian
    navigation.navigate('data');
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>PENGEMBALIAN</Text>
        <Text style={styles.infoText}>
          Isi sesuai data yang diminta, lalu klik proses jika sudah sesuai.
        </Text>
      </View>

      <ScrollView>
        {/* Input Nama Peminjam */}
        <View style={[styles.inputContainer, errors.name && styles.errorInput]}>
          <FontAwesome name="user" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Peminjam"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        {errors.name && (
          <Text style={styles.errorMessage}>
            <FontAwesome name="exclamation-circle" size={14} color="red" /> Kolom ini wajib diisi
          </Text>
        )}

        {/* Input Nama Alat */}
        <View style={[styles.inputContainer, errors.alat && styles.errorInput]}>
          <Entypo name="tools" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Alat"
            value={alat}
            onChangeText={text => setAlat(text)}
          />
        </View>
        {errors.alat && (
          <Text style={styles.errorMessage}>
            <FontAwesome name="exclamation-circle" size={14} color="red" /> Kolom ini wajib diisi
          </Text>
        )}

        {/* Input Tanggal Pengembalian */}
        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Tanggal Pengembalian"
            value={returnDate.toLocaleDateString()}
            onFocus={() => { setReturnDate(new Date()); }}
          />
        </View>

        {/* Ambil Foto Barang */}
        <TouchableOpacity style={styles.menuItem} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={24} color="brown" />
          <Text style={styles.menuText}>AMBIL FOTO BARANG</Text>
        </TouchableOpacity>
        {errors.photo && (
          <Text style={styles.errorMessage}>
            <FontAwesome name="exclamation-circle" size={14} color="red" /> Foto barang wajib diambil
          </Text>
        )}

        {/* Menampilkan Foto yang Diambil */}
        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
              <MaterialIcons name="delete" size={24} color="red" />
              <Text style={styles.deleteButtonText}>HAPUS FOTO</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Navigasi Bottom */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <Text style={styles.homeButtonText}>KEMBALI KE HOME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleKembalikan}>
          <FontAwesome name="check" size={24} color="white" />
          <Text style={styles.submitButtonText}>KEMBALIKAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0070B8',
  },
  infoContainer: {
    backgroundColor: '#001F3F',
    padding: 12,
    borderRadius: 8,
    margin: 12,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorMessage: {
    color: 'red',
    marginLeft: 20,
    marginTop: -5,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  photoContainer: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'red',
    marginLeft: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    backgroundColor: '#001F3F',
  },
  homeButton: {
    backgroundColor: '#D80032',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#0070B8',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
});
