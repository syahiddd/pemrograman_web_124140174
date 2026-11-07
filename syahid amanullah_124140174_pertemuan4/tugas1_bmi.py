"""Soal 1: Program penghitung BMI."""


def hitung_bmi(berat, tinggi):
    """Hitung BMI.

    Parameter:
        berat (float): berat badan dalam kg.
        tinggi (float): tinggi badan dalam meter.
    Return:
        float: nilai BMI = berat / (tinggi * tinggi).
    """
    return berat / (tinggi * tinggi)


def kategori_bmi(bmi):
    """Tentukan kategori BMI.

    Parameter:
        bmi (float): nilai BMI.
    Return:
        str: kategori berat badan.
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


if __name__ == "__main__":
    berat = float(input("Berat badan (kg): "))
    tinggi = float(input("Tinggi badan (m): "))

    bmi = hitung_bmi(berat, tinggi)
    print(f"\nBMI      : {bmi:.2f}")
    print(f"Kategori : {kategori_bmi(bmi)}")
