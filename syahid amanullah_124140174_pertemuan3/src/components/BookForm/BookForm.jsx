import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { STATUS_LABELS } from '../../utils/constants';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', status: 'milik' };

// Form untuk menambah buku baru, atau mengedit buku jika editingBook dikirim
function BookForm({ onSubmit, editingBook = null, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Saat tombol Edit diklik, isi form dengan data buku tersebut
  useEffect(() => {
    setForm(editingBook ? editingBook : EMPTY_FORM);
    setErrors({});
  }, [editingBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi: judul dan penulis wajib diisi
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Judul wajib diisi';
    if (!form.author.trim()) newErrors.author = 'Penulis wajib diisi';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({ title: form.title.trim(), author: form.author.trim(), status: form.status });
    setForm(EMPTY_FORM);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{editingBook ? 'Edit Buku' : 'Tambah Buku'}</h2>

      <label htmlFor="title">Judul</label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        className={errors.title ? 'input-error' : ''}
      />
      {errors.title && <p className="error-text">{errors.title}</p>}

      <label htmlFor="author">Penulis</label>
      <input
        id="author"
        name="author"
        value={form.author}
        onChange={handleChange}
        className={errors.author ? 'input-error' : ''}
      />
      {errors.author && <p className="error-text">{errors.author}</p>}

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={form.status} onChange={handleChange}>
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <div className="form-buttons">
        <button type="submit">{editingBook ? 'Simpan' : 'Tambah'}</button>
        {editingBook && (
          <button type="button" className="btn-secondary" onClick={onCancel}>Batal</button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editingBook: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
  }),
  onCancel: PropTypes.func,
};

export default BookForm;
