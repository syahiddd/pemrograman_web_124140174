import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';

const mockFn = typeof vi !== 'undefined' ? vi.fn : jest.fn;

describe('Komponen BookList', () => {
  const books = [{ id: 1, title: 'Bumi Manusia', author: 'Pramoedya', status: 'milik' }];

  test('merender judul, penulis, dan status buku', () => {
    render(<BookList books={books} onEdit={mockFn()} onDelete={mockFn()} />);
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.getByText('Pramoedya')).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();
  });

  test('memanggil onDelete dengan id buku saat tombol Hapus diklik', () => {
    const mockDelete = mockFn();
    render(<BookList books={books} onEdit={mockFn()} onDelete={mockDelete} />);
    fireEvent.click(screen.getByText('Hapus'));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  test('menampilkan pesan jika tidak ada buku', () => {
    render(<BookList books={[]} onEdit={mockFn()} onDelete={mockFn()} />);
    expect(screen.getByText('Tidak ada buku.')).toBeInTheDocument();
  });
});
