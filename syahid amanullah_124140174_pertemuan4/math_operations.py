"""Modul operasi matematika: bangun datar dan konversi suhu."""

PI = 3.14159


def luas_persegi(sisi):
    """Luas persegi.

    Parameter: sisi (float) panjang sisi.
    Return: float luas.
    """
    return sisi * sisi


def keliling_persegi(sisi):
    """Keliling persegi.

    Parameter: sisi (float) panjang sisi.
    Return: float keliling.
    """
    return 4 * sisi


def luas_persegi_panjang(panjang, lebar):
    """Luas persegi panjang.

    Parameter: panjang (float), lebar (float).
    Return: float luas.
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Keliling persegi panjang.

    Parameter: panjang (float), lebar (float).
    Return: float keliling.
    """
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari):
    """Luas lingkaran.

    Parameter: jari_jari (float).
    Return: float luas (PI * r^2).
    """
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari):
    """Keliling lingkaran.

    Parameter: jari_jari (float).
    Return: float keliling (2 * PI * r).
    """
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius):
    """Konversi Celsius ke Fahrenheit.

    Parameter: celsius (float).
    Return: float suhu dalam Fahrenheit.
    """
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius):
    """Konversi Celsius ke Kelvin.

    Parameter: celsius (float).
    Return: float suhu dalam Kelvin.
    """
    return celsius + 273.15
