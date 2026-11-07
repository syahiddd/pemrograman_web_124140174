# Tugas Praktikum Pemrograman Aplikasi Web — Pertemuan 5 (Python OOP)

| | |
|---|---|
| **Nama** | Syahid Amanullah |
| **NIM** | 124140174 |
| **Kelas** | RA |

## Deskripsi Program

Sistem Manajemen Perpustakaan Sederhana (`tugas_perpustakaan/`). Alur `main.py`:
tambah item → tampilkan katalog → cari berdasarkan ID/judul → pinjam item dan cek status → hitung denda.

Penerapan empat pilar OOP:

- **Class** — `LibraryItem`, `Book`, `Magazine`, `Member`, dan `Library` masing-masing membungkus data dan perilakunya sendiri.
- **Inheritance** — `Book` dan `Magazine` mewarisi `LibraryItem` (`super().__init__`), sehingga `item_id`, `judul`, dan status pinjam tidak ditulis ulang.
- **Encapsulation** — `__dipinjam` (di `LibraryItem`), `__koleksi` (di `Library`), dan `__pinjaman` (di `Member`) bersifat private; `_judul`, `_penulis`, `_edisi` protected. Akses lewat `@property`, dan setter `is_dipinjam` memvalidasi tipe `bool`. `Member.pinjaman` mengembalikan salinan agar daftar aslinya tidak bisa diubah dari luar.
- **Polymorphism** — `LibraryItem` adalah abstract class dengan abstract method `get_detail()` dan `hitung_denda()`. Tiap subclass mengimplementasikannya berbeda (denda buku Rp1.000/hari, majalah Rp500/hari), dan `Library` memperlakukan semua item lewat tipe dasar yang sama.

### Struktur

```
latihan/               # 7 latihan hands-on (satu konsep per file)
tugas_perpustakaan/
├── library_item.py    # LibraryItem (ABC), Book, Magazine
├── member.py          # Member (pinjam & kembalikan)
├── library.py         # Library (tambah, tampilkan, cari)
└── main.py            # skrip uji
```

## Cara Menjalankan

Butuh Python 3.10+.

```bash
cd tugas_perpustakaan
python main.py
```

Latihan dijalankan satu per satu, contoh: `python latihan/03_inheritance.py`.

## Output (`python main.py`)

Menunjukkan fitur penambahan, katalog, pencarian, dan status ketersediaan.

```
=== 1. Tambah item ===
Total koleksi: 3

=== 2. Katalog tersedia ===
[B01] Buku 'Python Dasar' oleh Guido - Tersedia
[B02] Buku 'Pemrograman Web' oleh Budi - Tersedia
[M01] Majalah 'Tech Weekly' edisi 42 - Tersedia

=== 3. Pencarian ===
Cari ID 'M01': [M01] Majalah 'Tech Weekly' edisi 42 - Tersedia
Cari judul 'python': ["[B01] Buku 'Python Dasar' oleh Guido - Tersedia"]

=== 4. Peminjaman & status ===
Error: 'Python Dasar' sedang dipinjam
[B02] Buku 'Pemrograman Web' oleh Budi - Tersedia
[M01] Majalah 'Tech Weekly' edisi 42 - Tersedia

=== 5. Polymorphism: denda telat 3 hari ===
Python Dasar: Rp3,000
Tech Weekly: Rp1,500
```

<!-- TODO: ganti blok output di atas dengan screenshot terminal (taruh di folder screenshots/) -->
