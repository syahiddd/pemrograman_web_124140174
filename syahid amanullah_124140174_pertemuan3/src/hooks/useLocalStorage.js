import { useState, useEffect } from 'react';

// Custom hook: state yang otomatis tersinkron dengan localStorage.
// Cara pakainya sama seperti useState: const [value, setValue] = useLocalStorage(key, awal)
function useLocalStorage(key, initialValue) {
  // Lazy initializer: localStorage hanya dibaca sekali saat komponen pertama kali dimuat
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Data rusak / bukan JSON valid -> kembali ke nilai awal
      console.error(error);
      return initialValue;
    }
  });

  // Setiap kali nilai berubah, tulis ulang ke localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
