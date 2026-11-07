// =========================================================
// main.js - entry point: menghubungkan DashboardApp dengan tampilan (DOM)
// =========================================================
import DashboardApp from "./DashboardApp.js";
import { CONDITION_ICONS, getToday, escapeHTML } from "./utils.js";

const app = new DashboardApp();

// ---------- Referensi Elemen DOM ----------
const weatherBox = document.getElementById("weatherBox");
const refreshBtn = document.getElementById("refreshBtn");
const summaryBox = document.getElementById("summaryBox");
const noteList = document.getElementById("noteList");
const noteCount = document.getElementById("noteCount");

const noteForm = document.getElementById("noteForm");
const formTitle = document.getElementById("formTitle");
const dateInput = document.getElementById("noteDate");
const conditionInput = document.getElementById("noteCondition");
const tempInput = document.getElementById("noteTemp");
const textInput = document.getElementById("noteText");
const formError = document.getElementById("formError");
const fillBtn = document.getElementById("fillBtn");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// ID catatan yang sedang diedit (null = mode tambah). Pakai let karena nilainya berubah.
let editingId = null;

// =========================================================
// RENDER (template literals)
// =========================================================

const renderWeather = ({ temperature, windspeed, condition, time }) => {
  weatherBox.innerHTML = `
    <div class="weather-main">
      <span class="weather-icon">${CONDITION_ICONS[condition]}</span>
      <div>
        <div class="weather-temp">${temperature}°C</div>
        <div class="weather-desc">${condition}</div>
      </div>
    </div>
    <p class="weather-info">💨 Angin ${windspeed} km/jam</p>
    <p class="weather-info">📍 Kampus ITERA, Lampung Selatan</p>
    <p class="weather-time">Data pukul ${time.slice(11)} WIB · sumber Open-Meteo</p>
  `;
};

const renderSummary = () => {
  const { total, average, rainyDays, hottest } = app.getSummary();
  summaryBox.innerHTML = `
    <div class="stat"><span>Total Catatan</span><strong>${total}</strong></div>
    <div class="stat"><span>Rata-rata Suhu</span><strong>${average}°C</strong></div>
    <div class="stat"><span>Suhu Tertinggi</span><strong>${hottest}°C</strong></div>
    <div class="stat"><span>Hari Hujan</span><strong>${rainyDays} hari</strong></div>
  `;
};

const renderNotes = () => {
  const notes = app.getSortedNotes();
  noteCount.textContent = `${notes.length} catatan`;

  if (notes.length === 0) {
    noteList.innerHTML = `<li class="empty">Belum ada catatan. Yuk catat cuaca hari ini!</li>`;
    return;
  }

  noteList.innerHTML = notes
    .map(
      (note) => `
      <li class="note-item ${note.isRainy() ? "rainy" : ""}" data-id="${note.id}">
        <span class="note-icon">${note.icon}</span>
        <div class="note-body">
          <strong>${note.condition} · ${note.temperature}°C</strong>
          <small>${note.formattedDate}</small>
          ${note.note ? `<p>${escapeHTML(note.note)}</p>` : ""}
        </div>
        <div class="note-actions">
          <button type="button" class="btn btn-edit" data-action="edit">Edit</button>
          <button type="button" class="btn btn-delete" data-action="delete">Hapus</button>
        </div>
      </li>`
    )
    .join("");
};

const refreshUI = () => {
  renderSummary();
  renderNotes();
};

// =========================================================
// ASYNC: ambil data cuaca (async/await + try...catch...finally)
// =========================================================

const loadWeather = async () => {
  refreshBtn.disabled = true;
  weatherBox.innerHTML = `<p class="empty">Memuat data cuaca...</p>`;

  try {
    const weather = await app.fetchWeather();
    renderWeather(weather);
  } catch (error) {
    weatherBox.innerHTML = `<p class="empty error">⚠️ ${error.message}. Periksa koneksi internet.</p>`;
  } finally {
    refreshBtn.disabled = false;
  }
};

// =========================================================
// FORM: tambah & edit catatan
// =========================================================

const resetForm = () => {
  editingId = null;
  noteForm.reset();
  dateInput.value = getToday();
  formError.textContent = "";
  formTitle.textContent = "Tambah Catatan Cuaca";
  submitBtn.textContent = "+ Simpan Catatan";
  cancelBtn.hidden = true;
};

const startEdit = (id) => {
  const { date, condition, temperature, note } = app.findNote(id);
  editingId = id;
  dateInput.value = date;
  conditionInput.value = condition;
  tempInput.value = temperature;
  textInput.value = note;
  formTitle.textContent = "✏️ Edit Catatan Cuaca";
  submitBtn.textContent = "Simpan Perubahan";
  cancelBtn.hidden = false;
  noteForm.scrollIntoView({ behavior: "smooth" });
};

const validateForm = ({ date, condition, temperature }) => {
  if (!date) return "Tanggal wajib diisi.";
  if (!condition) return "Pilih kondisi cuaca.";
  if (temperature === "" || Number.isNaN(Number(temperature))) return "Suhu wajib diisi dengan angka.";
  if (temperature < -10 || temperature > 50) return "Suhu harus di antara -10°C dan 50°C.";
  return "";
};

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    date: dateInput.value,
    condition: conditionInput.value,
    temperature: tempInput.value.trim(),
    note: textInput.value.trim(),
  };

  const errorMessage = validateForm(formData);
  formError.textContent = errorMessage;
  if (errorMessage) return;

  if (editingId) {
    app.updateNote(editingId, formData);
  } else {
    app.addNote(formData);
  }

  resetForm();
  refreshUI();
});

// Isi form otomatis dari data cuaca terakhir yang di-fetch
fillBtn.addEventListener("click", () => {
  if (!app.currentWeather) {
    formError.textContent = "Data cuaca belum tersedia.";
    return;
  }
  const { condition, temperature } = app.currentWeather;
  dateInput.value = getToday();
  conditionInput.value = condition;
  tempInput.value = temperature;
  formError.textContent = "";
});

cancelBtn.addEventListener("click", resetForm);
refreshBtn.addEventListener("click", loadWeather);

// Event delegation untuk tombol Edit & Hapus di setiap catatan
noteList.addEventListener("click", (event) => {
  const { action } = event.target.dataset;
  const item = event.target.closest(".note-item");
  if (!action || !item) return;

  const id = Number(item.dataset.id);
  if (action === "edit") {
    startEdit(id);
  } else if (action === "delete" && confirm("Hapus catatan ini?")) {
    app.deleteNote(id);
    if (editingId === id) resetForm();
    refreshUI();
  }
});

// ---------- Jalankan saat halaman dibuka ----------
resetForm();
refreshUI();
loadWeather();
