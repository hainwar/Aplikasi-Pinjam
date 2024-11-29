// context/PeminjamanContext.js
import React, { createContext, useState, useContext } from 'react';

// Buat Context untuk peminjaman
const PeminjamanContext = createContext();

// Hook untuk mengakses data peminjaman
export const usePeminjaman = () => useContext(PeminjamanContext);

// Provider untuk membungkus aplikasi dengan state global
export const PeminjamanProvider = ({ children }) => {
  const [peminjamanData, setPeminjamanData] = useState(null);

  const savePeminjaman = (data) => {
    setPeminjamanData(data);
  };

  return (
    <PeminjamanContext.Provider value={{ peminjamanData, savePeminjaman }}>
      {children}
    </PeminjamanContext.Provider>
  );
};
