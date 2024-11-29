import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Peminjaman() {
  const [name, setName] = useState('');
  const [alat, setAlat] = useState('');
  const [date, setDate] = useState(new Date());
  const [petugas, setPetugas] = useState('');
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
    if (!date) tempErrors.date = true;
    if (!petugas) tempErrors.petugas = true;
    if (!photo) tempErrors.photo = true;
    setErrors(tempErrors);
    
    return Object.keys(tempErrors).length === 0;
  };

  const handleAjukan = async () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Semua kolom wajib diisi sebelum melanjutkan.');
      return;
    }

    const peminjamanData = {
      name,
      alat,
      date,
      petugas,
      photo
    };

    try {
      const existingData = await AsyncStorage.getItem('historyData');
      const newHistory = existingData ? JSON.parse(existingData) : [];
      newHistory.push(peminjamanData);
      await AsyncStorage.setItem('historyData', JSON.stringify(newHistory));

      Alert.alert('Sukses', 'Data peminjaman berhasil diajukan.');
      navigation.navigate('data');
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data peminjaman.');
      console.error(error);
    }
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>PEMINJAMAN</Text>
        <Text style={styles.infoText}>
          Isi sesuai data yang diminta, lalu klik proses jika sudah sesuai.
        </Text>
      </View>

      <ScrollView>
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

        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={24} color="brown" />
          <input
            type="date"
            style={styles.dateInput}
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </View>

        <View style={[styles.inputContainer, errors.petugas && styles.errorInput]}>
          <FontAwesome name="user" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Petugas"
            value={petugas}
            onChangeText={text => setPetugas(text)}
          />
        </View>
        {errors.petugas && (
          <Text style={styles.errorMessage}>
            <FontAwesome name="exclamation-circle" size={14} color="red" /> Kolom ini wajib diisi
          </Text>
        )}

        <TouchableOpacity style={styles.menuItem} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={24} color="brown" />
          <Text style={styles.menuText}>AMBIL PHOTO</Text>
        </TouchableOpacity>
        {errors.photo && (
          <Text style={styles.errorMessage}>
            <FontAwesome name="exclamation-circle" size={14} color="red" /> Foto wajib diambil
          </Text>
        )}

        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
              <MaterialIcons name="delete" size={24} color="red" />
              <Text style={styles.deleteButtonText}>HAPUS PHOTO</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <Text style={styles.homeButtonText}>KEMBALI KE HOME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleAjukan}>
          <FontAwesome name="check" size={24} color="white" />
          <Text style={styles.submitButtonText}>AJUKAN</Text>
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  input: {
    marginLeft: 12,
    fontSize: 16,
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
    padding: 12,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    paddingLeft: 16,
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
