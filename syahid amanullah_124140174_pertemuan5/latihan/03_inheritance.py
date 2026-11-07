"""Inheritance, super(), overriding, MRO, isinstance/issubclass."""


class Kendaraan:
    def __init__(self, merek, roda):
        self.merek, self.roda = merek, roda

    def deskripsi(self):
        return f"{self.merek} dengan {self.roda} roda"


class Mobil(Kendaraan):
    def __init__(self, merek):
        super().__init__(merek, 4)


class Motor(Kendaraan):
    def __init__(self, merek):
        super().__init__(merek, 2)

    def deskripsi(self):  # overriding
        return "Motor " + super().deskripsi()


class MobilListrik(Mobil):
    def __init__(self, merek, baterai):
        super().__init__(merek)
        self.baterai = baterai

    def deskripsi(self):
        return super().deskripsi() + f", baterai {self.baterai} kWh"


for k in (Mobil("Toyota"), Motor("Honda"), MobilListrik("Tesla", 75)):
    print(k.deskripsi())

print([c.__name__ for c in MobilListrik.__mro__])
print(isinstance(MobilListrik("X", 1), Kendaraan), issubclass(Motor, Mobil))
