"""Soal 2: Pengelolaan data nilai mahasiswa."""

mahasiswa = [
    {"nama": "Syahid Amanullah", "nim": "124140174", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Andi Pratama", "nim": "124140101", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Budi Santoso", "nim": "124140102", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Citra Lestari", "nim": "124140103", "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 60},
    {"nama": "Dewi Anggraini", "nim": "124140104", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
]


def hitung_nilai_akhir(uts, uas, tugas):
    """Hitung nilai akhir (30% UTS + 40% UAS + 30% Tugas).

    Parameter:
        uts (float): nilai UTS.
        uas (float): nilai UAS.
        tugas (float): nilai tugas.
    Return:
        float: nilai akhir.
    """
    return 0.3 * uts + 0.4 * uas + 0.3 * tugas


def tentukan_grade(nilai):
    """Tentukan grade huruf dari nilai akhir.

    Parameter:
        nilai (float): nilai akhir.
    Return:
        str: grade A-E.
    """
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    return "E"


# Tambahkan nilai akhir dan grade ke setiap dictionary
for m in mahasiswa:
    m["nilai_akhir"] = hitung_nilai_akhir(m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"])
    m["grade"] = tentukan_grade(m["nilai_akhir"])

# Tabel
print(f"{'No':<4}{'Nama':<20}{'NIM':<12}{'Nilai Akhir':>12}{'Grade':>7}")
print("-" * 55)
for i, m in enumerate(mahasiswa, start=1):
    print(f"{i:<4}{m['nama']:<20}{m['nim']:<12}{m['nilai_akhir']:>12.2f}{m['grade']:>7}")

# Tertinggi & terendah
tertinggi = max(mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(mahasiswa, key=lambda m: m["nilai_akhir"])
print(f"\nNilai tertinggi: {tertinggi['nama']} ({tertinggi['nilai_akhir']:.2f})")
print(f"Nilai terendah : {terendah['nama']} ({terendah['nilai_akhir']:.2f})")
