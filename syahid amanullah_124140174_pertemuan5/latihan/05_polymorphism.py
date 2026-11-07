"""Polymorphism: overriding, duck typing, operator overloading."""


class Transfer:
    def bayar(self, jumlah):
        return f"Transfer bank Rp{jumlah:,}"


class EWallet:
    def bayar(self, jumlah):
        return f"E-Wallet Rp{jumlah:,}"


class Kartu:
    def bayar(self, jumlah):
        return f"Kartu kredit Rp{jumlah:,}"


# duck typing: yang penting punya method bayar()
for metode in (Transfer(), EWallet(), Kartu()):
    print(metode.bayar(150_000))


class Uang:
    def __init__(self, nilai):
        self.nilai = nilai

    def __add__(self, other):
        return Uang(self.nilai + other.nilai)

    def __eq__(self, other):
        return self.nilai == other.nilai

    def __str__(self):
        return f"Rp{self.nilai:,}"


print(Uang(10_000) + Uang(5_000), Uang(1) == Uang(1))
