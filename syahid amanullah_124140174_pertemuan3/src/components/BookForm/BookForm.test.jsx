import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

// Deteksi otomatis mock function: vi untuk Vite (Vitest), jest untuk Create React App
const mockFn = typeof vi !== 'undefined' ? vi.fn : jest.fn;

describe('Komponen BookForm', () => {
  test('menampilkan pesan error jika judul dan penulis kosong', () => {
    const mockSubmit = mockFn();
    render(<BookForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Tambah'));

    expect(screen.getByText('Judul wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Penulis wajib diisi')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul')).toHaveClass('input-error');
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('memanggil onSubmit dengan data buku saat input valid', () => {
    const mockSubmit = mockFn();
    render(<BookForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Laskar Pelangi' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Andrea Hirata' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'baca' } });
    fireEvent.click(screen.getByText('Tambah'));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'baca',
    });
  });
});
