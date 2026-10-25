import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">Manajemen Buku</Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/stats">Statistik</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
