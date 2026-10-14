// =========================================================
// Fungsi bantu (helper) - semuanya arrow function
// =========================================================

// Ikon untuk setiap kondisi cuaca
export const CONDITION_ICONS = {
  Cerah: "☀️",
  Berawan: "⛅",
  Berkabut: "🌫️",
  Hujan: "🌧️",
  "Badai Petir": "⛈️",
};

// Ubah kode cuaca WMO dari Open-Meteo menjadi nama kondisi
export const getConditionFromCode = (code) => {
  if (code === 0) return "Cerah";
  if (code <= 3) return "Berawan";
  if (code <= 48) return "Berkabut";
  if (code <= 82) return "Hujan";
  return "Badai Petir";
};

// Tanggal hari ini dalam format "YYYY-MM-DD" (untuk input type="date")
export const getToday = () => new Date().toLocaleDateString("en-CA");

// "2026-10-12" -> "Senin, 12 Oktober 2026"
export const formatDate = (dateString) =>
  new Date(`${dateString}T00:00`).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Escape teks agar aman dimasukkan ke innerHTML (mencegah XSS)
export const escapeHTML = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};
