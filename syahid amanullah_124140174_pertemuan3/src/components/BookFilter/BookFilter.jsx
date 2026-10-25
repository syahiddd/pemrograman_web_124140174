import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_LABELS } from '../../utils/constants';
import './BookFilter.css';

// Input pencarian + dropdown filter status
function BookFilter({ search, onSearchChange, status, onStatusChange }) {
  return (
    <div className="book-filter">
      <input
        type="text"
        placeholder="Cari judul atau penulis..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        aria-label="Filter status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="semua">Semua</option>
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}

BookFilter.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default BookFilter;
