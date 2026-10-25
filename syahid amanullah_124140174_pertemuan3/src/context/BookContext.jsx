import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

// Consumer hook: panggil useBooks() di komponen mana pun di dalam BookProvider
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

// Provider: menyimpan daftar buku (persisten di localStorage) + fungsi pengubahnya
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books_data', []);

  const addBook = (newBook) => setBooks([...books, { ...newBook, id: Date.now() }]);
  const updateBook = (bookId, data) =>
    setBooks(books.map((book) => (book.id === bookId ? { ...book, ...data } : book)));
  const deleteBook = (bookId) => setBooks(books.filter((book) => book.id !== bookId));

  const value = { books, addBook, updateBook, deleteBook };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
