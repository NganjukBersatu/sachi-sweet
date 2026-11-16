/* ===== Data menu =====
   PENTING: isi di bawah ini hanya contoh.
   Kalau script.js lama kamu sudah punya daftar menu sendiri,
   salin menu itu ke array ini (kategori harus "dessert" atau "minuman"). */
const menuItems = [
  { nama: "Cheesecake",    kategori: "dessert", deskripsi: "Lembut dan creamy, dipanggang setiap hari.", harga: "Rp 25.000" },
  { nama: "Brownies",      kategori: "dessert", deskripsi: "Cokelat pekat dengan tekstur fudgy.",         harga: "Rp 18.000" },
  { nama: "Cream Puff",    kategori: "dessert", deskripsi: "Kulit renyah dengan isian krim vanila.",      harga: "Rp 15.000" },
  { nama: "Kopi Susu",     kategori: "minuman", deskripsi: "Kopi dan susu dengan manis yang pas.",        harga: "Rp 20.000" },
  { nama: "Matcha Latte",  kategori: "minuman", deskripsi: "Matcha harum dengan susu yang lembut.",       harga: "Rp 24.000" },
  { nama: "Es Teh Lemon",  kategori: "minuman", deskripsi: "Segar dan ringan untuk hari yang panas.",     harga: "Rp 12.000" }
  // Foto menu (opsional): tambahkan  gambar: "assets/nama-file.jpg"  pada item
];

/* ===== Elemen yang dipakai ===== */
const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
const menuGrid = document.getElementById("menuGrid");
const menuFilters = document.getElementById("menuFilters");

/* ===== Tahun otomatis di footer ===== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Bayangan header saat halaman di-scroll ===== */
function updateHeaderShadow() {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", updateHeaderShadow, { passive: true });
updateHeaderShadow();

/* ===== Menu navigasi di HP ===== */
function setNavOpen(open) {
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
}

navToggle.addEventListener("click", () => {
  setNavOpen(!nav.classList.contains("is-open"));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setNavOpen(false));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setNavOpen(false);
});

/* ===== Animasi kartu menu: muncul satu per satu saat terlihat ===== */
const cardObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, i) => {
        entry.target.style.animationDelay = (i * 90) + "ms"; // satu per satu
        entry.target.classList.add("is-visible");
        cardObserver.unobserve(entry.target);
      });
    }, { threshold: 0.2 })
  : null;

/* ===== Menampilkan kartu menu ===== */
function buatKartu(item) {
  const card = document.createElement("article");
  card.className = "menu-card menu-card--anim";

  const img = document.createElement("div");
  img.className = "menu-card__img";
  if (item.gambar) {
    const foto = document.createElement("img");
    foto.src = item.gambar;
    foto.alt = item.nama;
    foto.loading = "lazy";
    foto.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
    img.appendChild(foto);
  }

  const body = document.createElement("div");
  body.className = "menu-card__body";

  const judul = document.createElement("h3");
  judul.textContent = item.nama;

  const deskripsi = document.createElement("p");
  deskripsi.textContent = item.deskripsi;

  const harga = document.createElement("span");
  harga.className = "menu-card__price";
  harga.textContent = item.harga;

  body.append(judul, deskripsi, harga);
  card.append(img, body);
  return card;
}

function tampilkanMenu(filter) {
  menuGrid.replaceChildren();
  menuItems
    .filter(item => filter === "semua" || item.kategori === filter)
    .forEach(item => {
      const card = buatKartu(item);
      menuGrid.appendChild(card);
      if (cardObserver) cardObserver.observe(card);
      else card.classList.add("is-visible");
    });
}

// ===== Ulasan pelanggan (berjalan otomatis, loop tanpa putus) =====
const reviewTrack = document.getElementById("reviewTrack");
const jumlahReview = 10; // sesuai jumlah gambar di assets/review/

function buatKartuReview(nomor, salinan) {
  return `
    <div class="review-card${salinan ? " review-card--clone" : ""}"${salinan ? ' aria-hidden="true"' : ""}>
      <div class="review-card__box">
        <img src="assets/review/${nomor}.png" alt="${salinan ? "" : "Ulasan pelanggan " + nomor}">
      </div>
    </div>`;
}

function renderReviews() {
  const nomor = Array.from({ length: jumlahReview }, (_, i) => i + 1);
  reviewTrack.innerHTML =
    nomor.map((n) => buatKartuReview(n, false)).join("") +
    nomor.map((n) => buatKartuReview(n, true)).join("");
}

// ===== Filter kategori =====
menuFilters.addEventListener("click", (e) => {
  const tombol = e.target.closest(".chip");
  if (!tombol) return;

  menuFilters.querySelectorAll(".chip").forEach(chip => chip.classList.remove("is-active"));
  tombol.classList.add("is-active");
  tampilkanMenu(tombol.dataset.filter);
});

tampilkanMenu("semua");

/* ===== Muncul perlahan saat di-scroll ===== */
const revealTargets = document.querySelectorAll(
  ".section h2, .highlights li, .menu__filters, .menu__grid, .contact__grid > div"
);
revealTargets.forEach(el => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

renderMenu();
renderReviews();
