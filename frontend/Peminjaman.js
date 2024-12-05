import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

export default function Peminjaman() {
  const [name, setName] = useState('');
  const [alat, setAlat] = useState('');
  const [date, setDate] = useState(null); // Tanggal yang dipilih
  const [petugas, setPetugas] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); // Menampilkan kalender
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Izin Kamera Ditolak', 'Aplikasi memerlukan akses ke kamera untuk mengambil foto.');
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
    if (!petugas) tempErrors.petugas = true;
    if (!photo) tempErrors.photo = true;
    if (!date) tempErrors.date = true;  // Menambahkan validasi untuk tanggal
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAjukan = async () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Semua kolom wajib diisi sebelum melanjutkan.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('alat', alat);
    formData.append('date', date); // Tanggal yang dipilih
    formData.append('petugas', petugas);
    if (photo) {
      formData.append('photo', {
        uri: photo,
        type: 'image/jpeg',
        name: photo.split('/').pop(),
      });
    }

    try {
      const response = await fetch('http://localhost:3000/api/peminjaman', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Sukses', 'Data peminjaman berhasil diajukan.');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', result.message || 'Gagal menyimpan data peminjaman.');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data peminjaman.');
      console.error(error);
    }
  };

  const handleDayPress = (day) => {
    setDate(day.dateString); // Mengambil tanggal yang dipilih dalam format YYYY-MM-DD
    setShowCalendar(false); // Menyembunyikan kalender setelah memilih tanggal
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Judul */}
        <Text style={styles.title}>Ajukan Peminjaman</Text>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Peminjam"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Alat Input */}
        <View style={styles.inputContainer}>
          <Entypo name="tools" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Alat"
            value={alat}
            onChangeText={setAlat}
          />
        </View>

        {/* Date Picker */}
        <TouchableOpacity 
          onPress={() => setShowCalendar(true)} 
          style={[styles.inputContainer, errors.date && styles.errorInput]}
        >
          <FontAwesome name="calendar" size={24} color="brown" />
          <Text style={styles.dateInput}>
            {date ? date : 'Pilih Tanggal'}
          </Text>
        </TouchableOpacity>

        {showCalendar && (
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress} // Fungsi untuk menangani klik pada hari
              markedDates={{ [date]: { selected: true, selectedColor: 'blue' } }} // Menandai tanggal yang dipilih
            />
          </View>
        )}

        {/* Petugas Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Petugas"
            value={petugas}
            onChangeText={setPetugas}
          />
        </View>

        {/* Photo Section */}
        <TouchableOpacity style={styles.menuItem} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={24} color="brown" />
          <Text style={styles.menuText}>AMBIL PHOTO</Text>
        </TouchableOpacity>
        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
              <MaterialIcons name="delete" size={24} color="red" />
              <Text style={styles.deleteButtonText}>HAPUS PHOTO</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tombol Sejajar */}
        <View style={styles.buttonContainer}>
          {/* Tombol Kembali */}
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#ffff' }]} onPress={() => navigation.goBack()}>
            <Text style={[styles.submitButtonText, { color: '#000'}]}>KEMBALI</Text>
          </TouchableOpacity>

          {/* Tombol Ajukan */}
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#ffff' }]} onPress={handleAjukan}>
            <Text style={[styles.submitButtonText, { color: '#000' }]}>AJUKAN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0070B8', paddingTop: 20 },
  scrollContent: { paddingBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    elevation: 3, // Adds shadow for better separation
  },
  input: { marginLeft: 10, flex: 1, fontSize: 16, color: '#333', padding: 10 },
  dateInput: { marginLeft: 10, fontSize: 16, color: '#333' },
  calendarContainer: {
    position: 'absolute',
    top: 150, // Mengatur posisi kalender
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    zIndex: 1,
  },
  photoContainer: { alignItems: 'center', margin: 10 },
  image: { width: 120, height: 120, borderRadius: 8, marginBottom: 10 },
  deleteButton: { marginTop: 5, flexDirection: 'row', alignItems: 'center' },
  deleteButtonText: { color: 'red', marginLeft: 5, fontSize: 14 },
  submitButton: {
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    elevation: 5, // Adds shadow for better button visibility
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center', // Center content in the button
  },
  submitButtonText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  menuText: { marginLeft: 10, fontSize: 16, color: '#0070B8' },
  errorInput: { borderColor: 'red', borderWidth: 1 }, // Menambahkan border merah jika ada error
  buttonContainer: {
    flexDirection: 'row', // Membuat tombol sejajar
    justifyContent: 'space-between', // Memberikan jarak antar tombol
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
