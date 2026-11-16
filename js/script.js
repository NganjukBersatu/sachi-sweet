// ===== Data menu (ganti dengan menu asli Sachi Sweet) =====
const menuItems = [
  { nama: "Strawberry Cake",  kategori: "dessert", harga: 28000, desk: "Sponge lembut dengan krim dan stroberi." },
  { nama: "Choco Lava",       kategori: "dessert", harga: 25000, desk: "Cokelat hangat yang meleleh di tengah." },
  { nama: "Pudding Caramel",  kategori: "dessert", harga: 18000, desk: "Puding halus dengan saus karamel." },
  { nama: "Sachi Latte",      kategori: "minuman", harga: 24000, desk: "Espresso, susu, dan sirup vanila." },
  { nama: "Rose Milk Tea",    kategori: "minuman", harga: 22000, desk: "Teh susu dengan aroma mawar." },
  { nama: "Peach Soda",       kategori: "minuman", harga: 20000, desk: "Soda persik segar dengan es." }
];

const menuGrid    = document.getElementById("menuGrid");
const menuFilters = document.getElementById("menuFilters");
const header      = document.getElementById("header");
const nav         = document.getElementById("nav");
const navToggle   = document.getElementById("navToggle");

const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

// ===== Tampilkan menu =====
function renderMenu(filter = "semua") {
  const items = filter === "semua"
    ? menuItems
    : menuItems.filter((item) => item.kategori === filter);

  menuGrid.innerHTML = items.map((item) => `
    <article class="menu-card">
      <div class="menu-card__img"></div>
      <div class="menu-card__body">
        <h3>${item.nama}</h3>
        <p>${item.desk}</p>
        <span class="menu-card__price">${formatRupiah(item.harga)}</span>
      </div>
    </article>
  `).join("");
}

// ===== Filter kategori =====
menuFilters.addEventListener("click", (e) => {
  const tombol = e.target.closest(".chip");
  if (!tombol) return;
  menuFilters.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
  tombol.classList.add("is-active");
  renderMenu(tombol.dataset.filter);
});

// ===== Navigasi mobile =====
navToggle.addEventListener("click", () => {
  const terbuka = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", terbuka);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ===== Bayangan header saat scroll =====
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
});

// ===== Tahun otomatis di footer =====
document.getElementById("year").textContent = new Date().getFullYear();

renderMenu();