import React, { useState } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import './Home.css';

function Home() {
  // Ambil data & fungsi dari Context, tanpa props dari App
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('semua');
  const [editingBook, setEditingBook] = useState(null);

  // Saring buku berdasarkan status dan kata kunci (judul / penulis)
  const keyword = search.toLowerCase();
  const filteredBooks = books.filter((book) => {
    const cocokStatus = status === 'semua' || book.status === status;
    const cocokKata =
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword);
    return cocokStatus && cocokKata;
  });

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
    } else {
      addBook(data);
    }
  };

  return (
    <main className="container">
      <BookForm
        onSubmit={handleSubmit}
        editingBook={editingBook}
        onCancel={() => setEditingBook(null)}
      />
      <h2 className="list-title">Daftar Buku</h2>
      <BookFilter
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />
      <BookList books={filteredBooks} onEdit={setEditingBook} onDelete={deleteBook} />
    </main>
  );
}

export default Home;
