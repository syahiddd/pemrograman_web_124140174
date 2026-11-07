import { CONDITION_ICONS, formatDate } from "./utils.js";

// =========================================================
// Class TaskItem - model data untuk satu catatan cuaca
// =========================================================
export default class TaskItem {
  // Destructuring + default parameter langsung di parameter constructor
  constructor({ id = Date.now(), date, condition, temperature, note = "" }) {
    this.id = id;
    this.date = date;
    this.condition = condition;
    this.temperature = Number(temperature);
    this.note = note;
  }

  get icon() {
    return CONDITION_ICONS[this.condition] ?? "❔";
  }

  get formattedDate() {
    return formatDate(this.date);
  }

  isRainy() {
    return this.condition === "Hujan" || this.condition === "Badai Petir";
  }
}
