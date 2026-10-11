/* =========================================================
   Mini POS - Logika Aplikasi
   1. Validasi form input barang
   2. Kalkulator (subtotal, total, diskon, kembalian)
   3. Manajemen keranjang + localStorage
   ========================================================= */

// ---------- Konstanta ----------
const STORAGE_KEY = "miniPosCart";
const MIN_NAME_LENGTH = 3;
const MIN_PRICE = 500;
const MIN_QTY = 1;
const DISCOUNT_THRESHOLD = 50000;
const DISCOUNT_RATE = 0.1;
const PROMO_CODE = "HEMAT10";

// ---------- Referensi Elemen DOM ----------
const itemForm = document.getElementById("itemForm");
const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const itemQtyInput = document.getElementById("itemQty");
const formSuccess = document.getElementById("formSuccess");

const cartBody = document.getElementById("cartBody");
const itemCount = document.getElementById("itemCount");

const totalAmountEl = document.getElementById("totalAmount");
const promoCodeInput = document.getElementById("promoCode");
const promoInfo = document.getElementById("promoInfo");
const discountLabel = document.getElementById("discountLabel");
const discountAmountEl = document.getElementById("discountAmount");
const finalAmountEl = document.getElementById("finalAmount");
const paymentInput = document.getElementById("paymentAmount");
const changeAmountEl = document.getElementById("changeAmount");
const paymentStatus = document.getElementById("paymentStatus");
const resetBtn = document.getElementById("resetBtn");

// ---------- State ----------
let cart = loadCart();

// =========================================================
// UTILITAS
// =========================================================

/** Format angka menjadi Rupiah, mis. 15000 -> "Rp 15.000" */
function formatRupiah(value) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(value));
}

/** Escape teks agar aman ditampilkan di innerHTML (cegah XSS) */
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// =========================================================
// 1. VALIDASI FORM
// =========================================================

function showError(input, message) {
  input.classList.add("invalid");
  document.getElementById(input.id + "Error").textContent = message;
}

function clearError(input) {
  input.classList.remove("invalid");
  document.getElementById(input.id + "Error").textContent = "";
}

function validateName(value) {
  const name = value.trim();
  if (name === "") return "Nama barang wajib diisi.";
  if (name.length < MIN_NAME_LENGTH) return `Nama barang minimal ${MIN_NAME_LENGTH} karakter.`;
  return "";
}

function validatePrice(value) {
  if (value.trim() === "") return "Harga satuan wajib diisi.";
  const price = Number(value);
  if (Number.isNaN(price)) return "Harga harus berupa angka.";
  if (price <= 0) return "Harga harus bernilai positif.";
  if (price < MIN_PRICE) return `Harga minimal ${formatRupiah(MIN_PRICE)}.`;
  return "";
}

function validateQty(value) {
  if (value.trim() === "") return "Jumlah wajib diisi.";
  const qty = Number(value);
  if (Number.isNaN(qty)) return "Jumlah harus berupa angka.";
  if (!Number.isInteger(qty)) return "Jumlah harus bilangan bulat.";
  if (qty < MIN_QTY) return `Jumlah minimal ${MIN_QTY}.`;
  return "";
}

/**
 * Validasi semua input form.
 * Mengembalikan true jika semua valid, sekaligus menampilkan pesan error.
 */
function validateForm() {
  const rules = [
    [itemNameInput, validateName],
    [itemPriceInput, validatePrice],
    [itemQtyInput, validateQty],
  ];

  let isValid = true;
  let firstInvalid = null;

  rules.forEach(([input, validator]) => {
    const message = validator(input.value);
    if (message) {
      showError(input, message);
      isValid = false;
      if (!firstInvalid) firstInvalid = input;
    } else {
      clearError(input);
    }
  });

  if (firstInvalid) firstInvalid.focus();
  return isValid;
}

// =========================================================
// 2. KALKULATOR
// =========================================================

/** Subtotal = Harga Satuan x Qty */
function calculateSubtotal(item) {
  return item.price * item.qty;
}

/** Total = jumlah seluruh subtotal */
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + calculateSubtotal(item), 0);
}

/** Cek apakah kode promo yang diinput valid (tidak case-sensitive) */
function isPromoValid(code) {
  return code.trim().toUpperCase() === PROMO_CODE;
}

/**
 * Hitung diskon 10% jika total >= Rp 50.000 ATAU kode promo HEMAT10 valid.
 * Diskon tidak dobel (maksimal 10%).
 */
function calculateDiscount(total, promoCode) {
  if (total <= 0) return { amount: 0, reason: "" };

  const reachedThreshold = total >= DISCOUNT_THRESHOLD;
  const promoApplied = isPromoValid(promoCode);

  if (!reachedThreshold && !promoApplied) return { amount: 0, reason: "" };

  const reason = promoApplied ? `(promo ${PROMO_CODE})` : "(belanja ≥ Rp 50.000)";
  return { amount: Math.round(total * DISCOUNT_RATE), reason };
}

/** Kembalian = Uang Bayar - Total Akhir */
function calculateChange(payment, finalTotal) {
  return payment - finalTotal;
}

// =========================================================
// 3. LOCALSTORAGE
// =========================================================

/** Simpan keranjang ke localStorage (serialisasi dengan JSON.stringify) */
function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/** Muat keranjang dari localStorage (deserialisasi dengan JSON.parse) */
function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("Data keranjang di localStorage rusak, direset.", err);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

// =========================================================
// MANAJEMEN KERANJANG
// =========================================================

/**
 * Tambah barang ke keranjang.
 * Jika barang dengan nama & harga yang sama sudah ada, qty-nya digabung.
 */
function addItem(name, price, qty) {
  const existing = cart.find(
    (item) => item.name.toLowerCase() === name.toLowerCase() && item.price === price
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: Date.now(), name, price, qty });
  }

  saveCart();
  refreshUI();
}

/** Hapus satu barang dari keranjang berdasarkan id */
function deleteItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  refreshUI();
}

/** Kosongkan keranjang, bersihkan localStorage, dan reset input pembayaran */
function resetTransaction() {
  if (cart.length > 0 && !confirm("Mulai transaksi baru? Semua isi keranjang akan dihapus.")) {
    return;
  }

  cart = [];
  localStorage.removeItem(STORAGE_KEY);
  promoCodeInput.value = "";
  paymentInput.value = "";
  itemForm.reset();
  [itemNameInput, itemPriceInput, itemQtyInput].forEach(clearError);
  formSuccess.textContent = "";
  refreshUI();
}

// =========================================================
// RENDER UI
// =========================================================

/** Tampilkan isi keranjang ke dalam tabel */
function renderCart() {
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="6">Keranjang masih kosong. Tambahkan barang melalui form di samping.</td>
      </tr>`;
  } else {
    cartBody.innerHTML = cart
      .map(
        (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHTML(item.name)}</td>
          <td class="num">${formatRupiah(item.price)}</td>
          <td class="num">${item.qty}</td>
          <td class="num">${formatRupiah(calculateSubtotal(item))}</td>
          <td class="center">
            <button type="button" class="btn btn-delete" data-id="${item.id}">Hapus</button>
          </td>
        </tr>`
      )
      .join("");
  }

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  itemCount.textContent = `${cart.length} jenis · ${totalQty} pcs`;
}

/** Hitung ulang & tampilkan total, diskon, total akhir, dan kembalian */
function updateSummary() {
  const total = calculateTotal(cart);
  const promoCode = promoCodeInput.value;
  const discount = calculateDiscount(total, promoCode);
  const finalTotal = total - discount.amount;

  totalAmountEl.textContent = formatRupiah(total);
  discountAmountEl.textContent = "- " + formatRupiah(discount.amount);
  discountLabel.textContent = discount.reason;
  finalAmountEl.textContent = formatRupiah(finalTotal);

  // Info kode promo
  promoInfo.className = "info";
  if (promoCode.trim() === "") {
    promoInfo.textContent =
      total > 0 && total < DISCOUNT_THRESHOLD
        ? `Belanja ${formatRupiah(DISCOUNT_THRESHOLD - total)} lagi untuk diskon 10% otomatis.`
        : "";
  } else if (isPromoValid(promoCode)) {
    promoInfo.textContent = "✔ Kode promo valid, diskon 10% diterapkan.";
    promoInfo.classList.add("ok");
  } else {
    promoInfo.textContent = "✖ Kode promo tidak valid.";
    promoInfo.classList.add("bad");
  }

  // Kalkulator pembayaran & kembalian
  paymentStatus.className = "payment-status";
  const paymentRaw = paymentInput.value.trim();

  if (paymentRaw === "" || finalTotal === 0) {
    changeAmountEl.textContent = formatRupiah(0);
    paymentStatus.textContent = finalTotal === 0 && paymentRaw !== "" ? "Keranjang masih kosong." : "";
    return;
  }

  const payment = Number(paymentRaw);
  const change = calculateChange(payment, finalTotal);

  if (Number.isNaN(payment) || payment < 0) {
    changeAmountEl.textContent = formatRupiah(0);
    paymentStatus.textContent = "Nominal uang bayar tidak valid.";
    paymentStatus.classList.add("bad");
  } else if (change < 0) {
    changeAmountEl.textContent = formatRupiah(0);
    paymentStatus.textContent = `⚠ Uang belum mencukupi, kurang ${formatRupiah(-change)}.`;
    paymentStatus.classList.add("bad");
  } else {
    changeAmountEl.textContent = formatRupiah(change);
    paymentStatus.textContent = change === 0 ? "✔ Uang pas." : "✔ Pembayaran cukup.";
    paymentStatus.classList.add("ok");
  }
}

function refreshUI() {
  renderCart();
  updateSummary();
}

// =========================================================
// EVENT HANDLER
// =========================================================

function handleFormSubmit(event) {
  event.preventDefault();
  formSuccess.textContent = "";

  if (!validateForm()) return;

  const name = itemNameInput.value.trim();
  const price = Number(itemPriceInput.value);
  const qty = Number(itemQtyInput.value);

  addItem(name, price, qty);

  // Reset form setelah berhasil
  itemForm.reset();
  itemQtyInput.value = 1;
  itemNameInput.focus();
  formSuccess.textContent = `✔ "${name}" (${qty}x) ditambahkan ke keranjang.`;
}

function handleCartClick(event) {
  const button = event.target.closest(".btn-delete");
  if (!button) return;
  deleteItem(Number(button.dataset.id));
}

itemForm.addEventListener("submit", handleFormSubmit);
cartBody.addEventListener("click", handleCartClick);
promoCodeInput.addEventListener("input", updateSummary);
paymentInput.addEventListener("input", updateSummary);
resetBtn.addEventListener("click", resetTransaction);

// Hapus pesan error secara real-time saat input diperbaiki
[
  [itemNameInput, validateName],
  [itemPriceInput, validatePrice],
  [itemQtyInput, validateQty],
].forEach(([input, validator]) => {
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid") && !validator(input.value)) clearError(input);
  });
});

// Render awal (data dimuat dari localStorage)
refreshUI();
