from library import Library
from library_item import Book, Magazine
from member import Member

lib = Library("Perpustakaan ITERA")

print("=== 1. Tambah item ===")
lib.tambah_item(Book("B01", "Python Dasar", "Guido"))
lib.tambah_item(Book("B02", "Pemrograman Web", "Budi"))
lib.tambah_item(Magazine("M01", "Tech Weekly", 42))
print(f"Total koleksi: {len(lib)}")

print("\n=== 2. Katalog tersedia ===")
for i in lib.tampilkan_tersedia():
    print(i)

print("\n=== 3. Pencarian ===")
print("Cari ID 'M01':", lib.cari_id("M01"))
print("Cari judul 'python':", [str(i) for i in lib.cari_judul("python")])

print("\n=== 4. Peminjaman & status ===")
syahid = Member("A01", "Syahid")
syahid.pinjam(lib.cari_id("B01"))
try:
    syahid.pinjam(lib.cari_id("B01"))
except ValueError as e:
    print("Error:", e)
for i in lib.tampilkan_tersedia():
    print(i)

print("\n=== 5. Polymorphism: denda telat 3 hari ===")
for i in (lib.cari_id("B01"), lib.cari_id("M01")):
    print(f"{i.judul}: Rp{i.hitung_denda(3):,}")
