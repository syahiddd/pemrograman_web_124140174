"""Encapsulation: private attribute, @property, validasi."""


class Rekening:
    def __init__(self, pemilik, saldo=0):
        self.pemilik = pemilik  # public
        self._cabang = "Bandar Lampung"  # protected (konvensi)
        self.__saldo = 0  # private (name mangling)
        self.saldo = saldo  # lewat setter -> tervalidasi

    @property
    def saldo(self):
        return self.__saldo

    @saldo.setter
    def saldo(self, nilai):
        if nilai < 0:
            raise ValueError("Saldo tidak boleh negatif")
        self.__saldo = nilai

    def setor(self, jumlah):
        if jumlah <= 0:
            raise ValueError("Jumlah setor harus positif")
        self.__saldo += jumlah

    def tarik(self, jumlah):
        if jumlah > self.__saldo:
            raise ValueError("Saldo tidak cukup")
        self.__saldo -= jumlah


r = Rekening("Syahid", 100_000)
r.setor(50_000)
r.tarik(30_000)
print("Saldo:", r.saldo)
try:
    r.tarik(1_000_000)
except ValueError as e:
    print("Error:", e)
try:
    print(r.__saldo)
except AttributeError:
    print("__saldo tidak bisa diakses langsung, tapi:", r._Rekening__saldo)
