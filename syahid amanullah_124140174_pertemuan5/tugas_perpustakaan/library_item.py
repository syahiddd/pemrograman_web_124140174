"""Abstract class LibraryItem beserta subclass Book dan Magazine."""
from abc import ABC, abstractmethod


class LibraryItem(ABC):
    def __init__(self, item_id, judul):
        self._item_id = item_id  # protected
        self._judul = judul  # protected
        self.__dipinjam = False  # private

    @property
    def item_id(self):
        return self._item_id

    @property
    def judul(self):
        return self._judul

    @property
    def is_dipinjam(self):
        return self.__dipinjam

    @is_dipinjam.setter
    def is_dipinjam(self, nilai):
        if not isinstance(nilai, bool):
            raise TypeError("is_dipinjam harus bool")
        self.__dipinjam = nilai

    @abstractmethod
    def get_detail(self):
        """Detail item (berbeda tiap jenis)."""

    @abstractmethod
    def hitung_denda(self, hari_telat):
        """Denda keterlambatan (tarif berbeda tiap jenis)."""

    def __str__(self):
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return f"[{self.item_id}] {self.get_detail()} - {status}"


class Book(LibraryItem):
    def __init__(self, item_id, judul, penulis):
        super().__init__(item_id, judul)
        self._penulis = penulis

    def get_detail(self):
        return f"Buku '{self.judul}' oleh {self._penulis}"

    def hitung_denda(self, hari_telat):
        return hari_telat * 1000


class Magazine(LibraryItem):
    def __init__(self, item_id, judul, edisi):
        super().__init__(item_id, judul)
        self._edisi = edisi

    def get_detail(self):
        return f"Majalah '{self.judul}' edisi {self._edisi}"

    def hitung_denda(self, hari_telat):
        return hari_telat * 500
