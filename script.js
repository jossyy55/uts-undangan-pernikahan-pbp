const params = new URLSearchParams(window.location.search);
const to = params.get('to');
if (to) document.getElementById('guestName').textContent = to;

// Buka undangan
document.getElementById('openBtn').addEventListener('click', function () {
  document.getElementById('cover').classList.add('hide');
  document.body.classList.remove('locked');
  window.scrollTo(0, 0);
});

// Navbar berubah saat scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', function () {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Tandai menu aktif sesuai halaman yang sedang tampil
const pages = document.querySelectorAll('#hero, main > section');
const links = document.querySelectorAll('#mainNav .nav-link');
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      links.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.5 });
pages.forEach(function (page) { observer.observe(page); });

// Tutup menu di layar kecil setelah salah satu menu diklik
const menu = document.getElementById('menu');
links.forEach(function (link) {
  link.addEventListener('click', function () {
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Hitung mundur
const target = new Date('2026-12-20T08:00:00+07:00').getTime();
function updateCountdown() {
  let diff = target - Date.now();
  if (diff < 0) diff = 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-d').textContent = d;
  document.getElementById('cd-h').textContent = h;
  document.getElementById('cd-m').textContent = m;
  document.getElementById('cd-s').textContent = s;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// RSVP dan daftar ucapan
const form = document.getElementById('rsvpForm');
const list = document.getElementById('wishList');
const wishes = [
  { nama: 'Keluarga Besar', hadir: 'Hadir', ucapan: 'Selamat menempuh hidup baru, semoga sakinah mawaddah warahmah.' }
];

function esc(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderWishes() {
  list.innerHTML = wishes.map(function (w) {
    return '<div class="wish"><b>' + esc(w.nama) + '</b> <small>(' + esc(w.hadir) + ')</small><p class="mb-0">' + esc(w.ucapan) + '</p></div>';
  }).join('');
}
renderWishes();

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }
  wishes.unshift({
    nama: document.getElementById('nama').value.trim(),
    hadir: document.getElementById('hadir').value,
    ucapan: document.getElementById('ucapan').value.trim()
  });
  renderWishes();
  form.reset();
  form.classList.remove('was-validated');
  bootstrap.Toast.getOrCreateInstance(document.getElementById('toastOk')).show();
});