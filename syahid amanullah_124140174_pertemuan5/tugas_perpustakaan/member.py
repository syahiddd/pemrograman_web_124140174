"""Anggota perpustakaan."""


class Member:
    def __init__(self, member_id, nama):
        self.member_id = member_id
        self.nama = nama
        self.__pinjaman = []  # private

    @property
    def pinjaman(self):
        return list(self.__pinjaman)  # salinan, daftar asli aman dari luar

    def pinjam(self, item):
        if item.is_dipinjam:
            raise ValueError(f"'{item.judul}' sedang dipinjam")
        item.is_dipinjam = True
        self.__pinjaman.append(item)

    def kembalikan(self, item):
        self.__pinjaman.remove(item)
        item.is_dipinjam = False
