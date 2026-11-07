import TaskItem from "./TaskItem.js";
import { getConditionFromCode } from "./utils.js";

const STORAGE_KEY = "cuacaIteraNotes";
// Endpoint dari modul + timezone agar jam data sesuai WIB
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true&timezone=Asia%2FJakarta";

// =========================================================
// Class DashboardApp - mengelola state, localStorage, dan fetch API
// =========================================================
export default class DashboardApp {
  constructor() {
    this.notes = this.loadNotes();
    this.currentWeather = null;
  }

  // ---------- localStorage ----------

  loadNotes() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
      // Ubah objek biasa hasil JSON.parse kembali menjadi instance TaskItem
      return saved.map((note) => new TaskItem(note));
    } catch (error) {
      console.error("Data localStorage rusak:", error);
      return [];
    }
  }

  saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notes));
  }

  // ---------- Async: ambil cuaca dari Open-Meteo ----------

  async fetchWeather() {
    const response = await fetch(WEATHER_URL);
    if (!response.ok) {
      throw new Error(`Gagal mengambil data (status ${response.status})`);
    }

    const data = await response.json();
    const { temperature, windspeed, weathercode, time } = data.current_weather;

    this.currentWeather = {
      temperature,
      windspeed,
      time,
      condition: getConditionFromCode(weathercode),
    };
    return this.currentWeather;
  }

  // ---------- CRUD catatan (immutable dengan spread operator) ----------

  addNote(noteData) {
    const newNote = new TaskItem(noteData);
    this.notes = [newNote, ...this.notes];
    this.saveNotes();
  }

  updateNote(id, newData) {
    this.notes = this.notes.map((note) => (note.id === id ? new TaskItem({ ...note, ...newData }) : note));
    this.saveNotes();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes();
  }

  findNote(id) {
    return this.notes.find((note) => note.id === id);
  }

  // Catatan diurutkan dari tanggal terbaru
  getSortedNotes() {
    return [...this.notes].sort((a, b) => b.date.localeCompare(a.date));
  }

  // ---------- Ringkasan (array methods: reduce & filter) ----------

  getSummary() {
    const total = this.notes.length;
    const totalTemp = this.notes.reduce((sum, note) => sum + note.temperature, 0);
    const average = total > 0 ? (totalTemp / total).toFixed(1) : "-";
    const rainyDays = this.notes.filter((note) => note.isRainy()).length;
    const hottest = this.notes.reduce((max, note) => (note.temperature > max ? note.temperature : max), -Infinity);

    return { total, average, rainyDays, hottest: total > 0 ? hottest : "-" };
  }
}
