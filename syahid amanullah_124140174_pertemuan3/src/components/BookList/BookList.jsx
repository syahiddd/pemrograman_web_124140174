import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_LABELS } from '../../utils/constants';
import './BookList.css';

// Menampilkan daftar buku beserta tombol Edit dan Hapus
function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">Tidak ada buku.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <span className={`badge badge-${book.status}`}>{STATUS_LABELS[book.status]}</span>
          </div>
          <div className="book-buttons">
            <button type="button" onClick={() => onEdit(book)}>Edit</button>
            <button type="button" className="btn-danger" onClick={() => onDelete(book.id)}>
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
