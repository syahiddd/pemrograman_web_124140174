"""Class Library: mengelola koleksi item."""
from library_item import LibraryItem


class Library:
    def __init__(self, nama):
        self.nama = nama
        self.__koleksi = []  # private

    def tambah_item(self, item):
        if not isinstance(item, LibraryItem):
            raise TypeError("item harus turunan LibraryItem")
        if self.cari_id(item.item_id):
            raise ValueError(f"ID {item.item_id} sudah ada")
        self.__koleksi.append(item)

    def tampilkan_tersedia(self):
        return [i for i in self.__koleksi if not i.is_dipinjam]

    def cari_id(self, item_id):
        return next((i for i in self.__koleksi if i.item_id == item_id), None)

    def cari_judul(self, kata):
        return [i for i in self.__koleksi if kata.lower() in i.judul.lower()]

    def __len__(self):
        return len(self.__koleksi)
