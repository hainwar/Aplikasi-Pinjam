import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigation = useNavigation();

  // Fungsi untuk toggle tema (dark/light)
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Fungsi untuk logout
  const logout = () => {
    // Implementasikan logika logout di sini (misalnya redirect atau clear session)
    alert('You have logged out!');
    // Contoh: navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkTheme]}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/TVRI_SULSEL_2023.png')} style={styles.logo} />
        <View>
          <Text style={styles.title}>IT Inventori TVRI Sulawesi Selatan</Text>
          <Text style={styles.subtitle}>TVRI Sulsel In Your Hand...</Text>
        </View>
      </View>

      {/* Red Container Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>PEMINJAMAN, PENGEMBALIAN, CEK STATUS BARANG?</Text>
        <Text style={styles.infoText}>
          Gampang kok sisa buka menu, isi sesuai, klik proses
          jika data berhasil didaftarkan...
        </Text>
      </View>

      {/* Main Menu */}
      <ScrollView>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('Peminjaman')} // Navigasi ke Peminjaman saat di klik
        >
          <FontAwesome name="book" size={24} color="brown" /> {/* Ganti ikon Peminjaman */}
          <Text style={styles.menuText}>PEMINJAMAN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}
          onPress={() => navigation.navigate('Pengembalian')}>
          <FontAwesome name="undo" size={24} color="brown" /> 
          <Text style={styles.menuText}>PENGEMBALIAN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} 
          onPress={() => navigation.navigate('data')}> 
          <FontAwesome name="list-alt" size={24} color="brown" /> 
          <Text style={styles.menuText}>DATA PEMINJAMAN&PENGEMBALIAN</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme}>
          <MaterialIcons name={isDarkTheme ? "wb-sunny" : "nights-stay"} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <FontAwesome name="sign-out" size={24} color="black" />
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
  darkTheme: {
    backgroundColor: '#333', // Dark mode background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#001F3F',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#ddd',
  },
  infoContainer: {
    backgroundColor: '#001F3F',
    padding: 16,
    borderRadius: 10,
    margin: 16,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Spread items evenly across the row
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});
