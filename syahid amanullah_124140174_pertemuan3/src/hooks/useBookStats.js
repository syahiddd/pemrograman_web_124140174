// Custom hook: menghitung jumlah buku total dan per status
function useBookStats(books) {
  return {
    total: books.length,
    milik: books.filter((book) => book.status === 'milik').length,
    baca: books.filter((book) => book.status === 'baca').length,
    beli: books.filter((book) => book.status === 'beli').length,
  };
}

export default useBookStats;
