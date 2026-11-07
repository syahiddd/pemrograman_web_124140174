"""Class, object, atribut class vs instance, __init__, __str__, __repr__."""


class Mahasiswa:
    universitas = "ITERA"  # atribut class (dipakai bersama)

    def __init__(self, nama, nim):
        self.nama = nama  # atribut instance
        self.nim = nim

    def perkenalan(self):
        return f"Saya {self.nama} dari {self.universitas}"

    def __str__(self):  # untuk pengguna
        return f"{self.nama} ({self.nim})"

    def __repr__(self):  # untuk debugging
        return f"Mahasiswa(nama={self.nama!r}, nim={self.nim!r})"


m1 = Mahasiswa("Syahid", "124140174")
m2 = Mahasiswa("Budi", "124140001")
print(m1.perkenalan())
print(str(m2), "|", repr(m2))
Mahasiswa.universitas = "Institut Teknologi Sumatera"
print(m1.universitas, "==", m2.universitas)
