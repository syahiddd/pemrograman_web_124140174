import React from 'react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <main className="container">
      <h2>Statistik Buku</h2>
      <div className="stats-grid">
        <div className="stat-box"><p>Total Buku</p><h3>{stats.total}</h3></div>
        <div className="stat-box"><p>Dimiliki</p><h3>{stats.milik}</h3></div>
        <div className="stat-box"><p>Sedang Dibaca</p><h3>{stats.baca}</h3></div>
        <div className="stat-box"><p>Ingin Dibeli</p><h3>{stats.beli}</h3></div>
      </div>
    </main>
  );
}

export default Stats;
