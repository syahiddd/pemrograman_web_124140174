"""Perbandingan pendekatan prosedural dan OOP pada kasus rekening."""

# --- Prosedural: data dan fungsi terpisah ---
saldo = 100


def tarik_prosedural(saldo, jumlah):
    return saldo - jumlah


saldo = tarik_prosedural(saldo, 30)
print("Prosedural, saldo:", saldo)


# --- OOP: data dan perilaku dibungkus dalam satu class ---
class Rekening:
    def __init__(self, saldo):
        self.saldo = saldo

    def tarik(self, jumlah):
        self.saldo -= jumlah


r = Rekening(100)
r.tarik(30)
print("OOP, saldo:", r.saldo)
