"""Program utama: memanggil semua fungsi di math_operations."""

import math_operations  # gaya import 1: seluruh modul
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin, PI  # gaya import 2

print(f"Konstanta PI = {PI}")

print("\n=== Persegi ===")
for sisi in (4, 7.5):
    print(f"Sisi {sisi}: luas = {math_operations.luas_persegi(sisi)}, "
          f"keliling = {math_operations.keliling_persegi(sisi)}")

print("\n=== Persegi Panjang ===")
for p, l in ((5, 3), (10, 2.5)):
    print(f"{p} x {l}: luas = {math_operations.luas_persegi_panjang(p, l)}, "
          f"keliling = {math_operations.keliling_persegi_panjang(p, l)}")

print("\n=== Lingkaran ===")
for r in (7, 10):
    print(f"r = {r}: luas = {math_operations.luas_lingkaran(r):.2f}, "
          f"keliling = {math_operations.keliling_lingkaran(r):.2f}")

print("\n=== Konversi Suhu ===")
for c in (0, 37, 100):
    print(f"{c} C = {celsius_ke_fahrenheit(c):.1f} F = {celsius_ke_kelvin(c):.2f} K")
