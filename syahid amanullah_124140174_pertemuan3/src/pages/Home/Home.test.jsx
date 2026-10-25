import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookProvider } from '../../context/BookContext';
import Home from './Home';

// Render Home di dalam BookProvider seperti di App.jsx
const renderHome = () =>
  render(
    <BookProvider>
      <Home />
    </BookProvider>
  );

const tambahBuku = (title, author, status) => {
  fireEvent.change(screen.getByLabelText('Judul'), { target: { value: title } });
  fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: author } });
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: status } });
  fireEvent.click(screen.getByText('Tambah'));
};

describe('Halaman Home', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('buku yang ditambahkan muncul di daftar', () => {
    renderHome();
    tambahBuku('Negeri 5 Menara', 'Ahmad Fuadi', 'milik');
    expect(screen.getByText('Negeri 5 Menara')).toBeInTheDocument();
  });

  test('pencarian menyaring daftar buku', () => {
    renderHome();
    tambahBuku('Pulang', 'Tere Liye', 'baca');
    tambahBuku('Supernova', 'Dee Lestari', 'beli');

    fireEvent.change(screen.getByPlaceholderText('Cari judul atau penulis...'), {
      target: { value: 'tere' },
    });
    expect(screen.getByText('Pulang')).toBeInTheDocument();
    expect(screen.queryByText('Supernova')).not.toBeInTheDocument();
  });
});
