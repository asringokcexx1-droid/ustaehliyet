/* ============================================
   EhliyetUsta - Ana JavaScript
   ============================================ */

// ---- GLOBAL VERİ YÜKLEME ----
let siteData = null;
let sorularData = null;

async function loadData() {
  try {
    const [icerikRes, sorularRes] = await Promise.all([
      fetch('data/icerik.json'),
      fetch('data/sorular.json')
    ]);
    siteData = await icerikRes.json();
    sorularData = await sorularRes.json();
  } catch (e) {
    console.warn('Veri yüklenemedi, örnek verilerle devam ediliyor.', e);
  }
}

// ---- NAVİGASYON ----
function initNav() {
  const ham = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-menu');
  if (ham && menu) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      menu.classList.toggle('open');
    });
  }
  // Aktif link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

// ---- TOAST BİLDİRİM ----
function showToast(msg, type = 'default', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', warning: '⚠️', default: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.default}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(120%)'; setTimeout(() => toast.remove(), 300); }, duration);
}

// ---- ARAMA ----
function initSearch(inputSel, targetSel, dataAttr) {
  const input = document.querySelector(inputSel);
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll(targetSel).forEach(el => {
      const text = (el.getAttribute(dataAttr) || el.textContent).toLowerCase();
      el.parentElement.style.display = text.includes(q) || !q ? '' : 'none';
    });
  });
}

// ---- FİLTRE CHİPS ----
function initChips(chipSel, targetSel, attr) {
  document.querySelectorAll(chipSel).forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll(chipSel).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.dataset.filter;
      document.querySelectorAll(targetSel).forEach(el => {
        el.style.display = (!val || val === 'all' || el.getAttribute(attr) === val) ? '' : 'none';
      });
    });
  });
}

// ---- MODAL ----
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('show');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('show');
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('show');
  if (e.target.classList.contains('modal-close')) e.target.closest('.modal-overlay').classList.remove('show');
});

// ---- ACCORDION ----
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });
}

// ---- DUYURU BANDI ----
function initDuyuruBandi() {
  if (!siteData) return;
  const textEl = document.querySelector('.duyuru-text');
  if (!textEl) return;
  const duyurular = siteData.duyurular || [];
  const texts = duyurular.map(d => `🔔 ${d.baslik}`).join('   •   ');
  textEl.innerHTML = `<span>${texts}   •   ${texts}</span>`;
}

// ---- VİDEO SAYFASI ----
function renderVideolar() {
  const grid = document.getElementById('video-grid');
  if (!grid || !siteData) return;
  const videolar = siteData.videolar || [];

  grid.innerHTML = videolar.map(v => `
    <div class="card video-card page-fade-in" data-kat="${v.kategori}" data-search="${v.baslik} ${v.aciklama}" onclick="openVideoModal(${v.id})">
      <div class="video-thumb">
        <img class="video-thumb-img" src="https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg" alt="${v.baslik}" loading="lazy">
        <div class="video-play-btn">▶</div>
        <span class="video-badge ${v.ucretmi ? 'premium' : ''}">${v.ucretmi ? '🔒 Premium' : '✅ Ücretsiz'}</span>
      </div>
      <div class="video-info">
        <div class="video-meta">
          <span class="kat">${v.kategori}</span>
          <span>⏱ ${v.sure}</span>
          <span>📅 ${formatDate(v.tarih)}</span>
        </div>
        <h3>${v.baslik}</h3>
        <p>${v.aciklama}</p>
      </div>
    </div>
  `).join('');
}

function openVideoModal(id) {
  if (!siteData) return;
  const v = siteData.videolar.find(x => x.id === id);
  if (!v) return;
  const modal = document.getElementById('video-modal');
  if (!modal) return;
  modal.querySelector('.modal-header h3').textContent = v.baslik;
  modal.querySelector('.modal-body').innerHTML = `
    <div style="position:relative;padding-bottom:56.25%;background:#000;border-radius:10px;overflow:hidden;margin-bottom:16px;">
      <iframe src="https://www.youtube.com/embed/${v.youtube_id}?autoplay=1&rel=0" 
        style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" 
        allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>
    </div>
    <p style="color:var(--text-muted);font-size:0.9rem;">${v.aciklama}</p>
    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">
      <span class="badge badge-blue">${v.kategori}</span>
      <span class="badge badge-gray">⏱ ${v.sure}</span>
      <span class="badge ${v.ucretmi ? 'badge-orange' : 'badge-green'}">${v.ucretmi ? 'Premium' : 'Ücretsiz'}</span>
    </div>`;
  openModal('video-modal');
}

// ---- NOTLAR SAYFASI ----
function renderNotlar() {
  const grid = document.getElementById('not-grid');
  if (!grid || !siteData) return;
  const notlar = siteData.notlar || [];
  const katIcons = { 'Trafik Kuralları': '🚦', 'İlk Yardım': '🚑', 'Motor': '🔧', 'Çevre': '🌱', 'Sürüş': '🚗' };

  grid.innerHTML = notlar.map(n => `
    <div class="card not-card page-fade-in" data-kat="${n.kategori}" data-search="${n.baslik} ${n.aciklama}">
      <div class="not-card-header">
        <div class="not-icon">${katIcons[n.kategori] || '📄'}</div>
        <div>
          <span class="badge badge-blue">${n.kategori}</span>
          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📄 ${n.sayfa} sayfa • ${formatDate(n.tarih)}</p>
        </div>
      </div>
      <div class="not-card-body">
        <h3>${n.baslik}</h3>
        <p>${n.aciklama}</p>
      </div>
      <div class="not-card-footer">
        <span class="badge badge-green">✅ Ücretsiz</span>
        <a class="btn-indir" href="assets/${n.dosya}" download="${n.dosya}">
          ⬇ İndir (PDF)
        </a>
      </div>
    </div>
  `).join('');
}

// ---- SINAV SİSTEMİ ----
const Sinav = (() => {
  let sorular = [];
  let aktifSoru = 0;
  let cevaplar = {};
  let sure = 0;
  let timerInterval = null;
  let baslamis = false;

  function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function baslat(kategori = 'all', soruSayisi = 20) {
    if (!sorularData) { showToast('Sorular yüklenemedi!', 'error'); return; }
    let havuz = sorularData.sorular;
    if (kategori !== 'all') havuz = havuz.filter(s => s.kategori === kategori);
    sorular = shuffle(havuz).slice(0, Math.min(soruSayisi, havuz.length));
    aktifSoru = 0; cevaplar = {}; sure = soruSayisi * 90;
    baslamis = true;
    document.getElementById('sinav-start')?.classList.add('hidden');
    document.getElementById('sinav-ekran')?.classList.remove('hidden');
    document.getElementById('sonuc-ekran')?.classList.remove('show');
    render();
    startTimer();
  }

  function render() {
    if (!baslamis || sorular.length === 0) return;
    const s = sorular[aktifSoru];
    const harfler = ['A', 'B', 'C', 'D'];

    // Progress
    const pct = Math.round((aktifSoru / sorular.length) * 100);
    const prog = document.getElementById('progress-fill');
    const progInfo = document.getElementById('progress-info');
    if (prog) prog.style.width = pct + '%';
    if (progInfo) progInfo.textContent = `${aktifSoru + 1} / ${sorular.length}`;

    // Soru
    const soruText = document.getElementById('soru-text');
    const soruNum = document.getElementById('soru-num');
    if (soruText) soruText.textContent = s.soru;
    if (soruNum) soruNum.textContent = `Soru ${aktifSoru + 1} / ${sorular.length}`;

    // Seçenekler
    const secEl = document.getElementById('secenekler');
    if (!secEl) return;
    secEl.innerHTML = s.secenekler.map((sec, i) => {
      let cls = 'secenek';
      const secildi = cevaplar[aktifSoru];
      if (secildi !== undefined) {
        if (i === s.dogru) cls += ' correct';
        else if (i === secildi && i !== s.dogru) cls += ' wrong';
        else if (i === secildi) cls += ' selected';
      }
      return `<button class="${cls}" onclick="Sinav.sec(${i})" ${secildi !== undefined ? 'disabled' : ''}>
        <span class="secenek-harf">${harfler[i]}</span> ${sec}
      </button>`;
    }).join('');

    // Açıklama
    const acEl = document.getElementById('aciklama-box');
    if (acEl) {
      acEl.className = 'aciklama-box' + (cevaplar[aktifSoru] !== undefined ? ' show' : '');
      acEl.innerHTML = `💡 <strong>Açıklama:</strong> ${s.aciklama}`;
    }

    // Butonlar
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    if (prevBtn) prevBtn.disabled = aktifSoru === 0;
    if (nextBtn) nextBtn.style.display = aktifSoru < sorular.length - 1 ? 'inline-flex' : 'none';
    if (finishBtn) finishBtn.style.display = aktifSoru === sorular.length - 1 ? 'inline-flex' : 'none';
  }

  function sec(i) {
    if (cevaplar[aktifSoru] !== undefined) return;
    cevaplar[aktifSoru] = i;
    render();
    // Otomatik sonraki soru (1.2 saniye bekle)
    if (aktifSoru < sorular.length - 1) {
      setTimeout(() => { aktifSoru++; render(); }, 1200);
    }
  }

  function onceki() { if (aktifSoru > 0) { aktifSoru--; render(); } }
  function sonraki() { if (aktifSoru < sorular.length - 1) { aktifSoru++; render(); } }

  function bitir() {
    clearInterval(timerInterval);
    let dogru = 0, yanlis = 0, bos = 0;
    sorular.forEach((s, i) => {
      if (cevaplar[i] === undefined) bos++;
      else if (cevaplar[i] === s.dogru) dogru++;
      else yanlis++;
    });
    const puan = Math.round((dogru / sorular.length) * 100);
    document.getElementById('sinav-ekran')?.classList.add('hidden');
    const se = document.getElementById('sonuc-ekran');
    if (se) {
      se.classList.add('show');
      const sonPuan = document.getElementById('son-puan');
      if (sonPuan) sonPuan.textContent = dogru;
      const sonDogru = document.getElementById('son-dogru');
      if (sonDogru) sonDogru.textContent = dogru;
      const sonYanlis = document.getElementById('son-yanlis');
      if (sonYanlis) sonYanlis.textContent = yanlis;
      const sonBos = document.getElementById('son-bos');
      if (sonBos) sonBos.textContent = bos;
      const sonMsg = document.getElementById('son-mesaj');
      if (sonMsg) {
        if (puan >= 70) sonMsg.innerHTML = `🎉 <strong>Tebrikler! Geçer not aldınız!</strong> Devam edin!`;
        else sonMsg.innerHTML = `📚 Biraz daha çalışmanız gerekiyor. Tekrar deneyin!`;
      }
    }
    // localStorage'a kaydet
    try {
      const gecmis = JSON.parse(localStorage.getItem('sinav_gecmis') || '[]');
      gecmis.unshift({ tarih: new Date().toISOString(), puan, dogru, yanlis, bos, toplam: sorular.length });
      localStorage.setItem('sinav_gecmis', JSON.stringify(gecmis.slice(0, 20)));
    } catch(e) {}
  }

  function startTimer() {
    clearInterval(timerInterval);
    renderTimer();
    timerInterval = setInterval(() => {
      sure--;
      renderTimer();
      if (sure <= 0) bitir();
    }, 1000);
  }

  function renderTimer() {
    const el = document.getElementById('timer');
    if (!el) return;
    const m = Math.floor(sure / 60).toString().padStart(2, '0');
    const s = (sure % 60).toString().padStart(2, '0');
    el.textContent = `${m}:${s}`;
    el.className = 'time';
    if (sure < 60) el.classList.add('danger');
    else if (sure < 180) el.classList.add('warning');
  }

  function tekrar() {
    baslamis = false;
    document.getElementById('sinav-ekran')?.classList.add('hidden');
    document.getElementById('sonuc-ekran')?.classList.remove('show');
    document.getElementById('sinav-start')?.classList.remove('hidden');
  }

  return { baslat, sec, onceki, sonraki, bitir, tekrar };
})();

// ---- SONUÇLAR SAYFASI ----
function renderSonuclar() {
  const grid = document.getElementById('sonuclar-grid');
  if (!grid || !siteData) return;
  const sonuclar = siteData.sinav_sonuclari || [];

  grid.innerHTML = sonuclar.map(s => `
    <div class="card sonuc-kart page-fade-in">
      <div class="img-wrap">
        <img src="assets/${s.gorsel}" alt="${s.baslik}" loading="lazy" 
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="img-placeholder" style="display:none;align-items:center;justify-content:center;width:100%;height:100%;min-height:200px;">🏆</div>
      </div>
      <div class="sonuc-kart-body">
        <span class="badge badge-gray">📅 ${formatDate(s.tarih)}</span>
        <h3 style="margin-top:8px;">${s.baslik}</h3>
        <p style="font-size:0.85rem;color:var(--text-muted);">${s.aciklama}</p>
        <div class="sonuc-stats-row">
          <span class="sonuc-pill katilimci">👥 ${s.katilimci} Katılımcı</span>
          <span class="sonuc-pill gecen">✅ ${s.gecen} Geçti</span>
          <span class="sonuc-pill tarih">%${Math.round(s.gecen/s.katilimci*100)} Başarı</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ---- ANASAYFA ----
function renderAnasayfa() {
  if (!siteData) return;
  initDuyuruBandi();

  // Duyurular
  const duyuruEl = document.getElementById('duyuru-listesi');
  if (duyuruEl) {
    duyuruEl.innerHTML = siteData.duyurular.map(d => `
      <div class="duyuru-card ${d.onemli ? 'onemli' : ''}">
        <div class="duyuru-dot"></div>
        <div>
          <strong style="font-size:0.95rem;">${d.baslik}</strong>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-top:4px;">${d.icerik}</p>
          <span style="font-size:0.75rem;color:var(--text-muted);">📅 ${formatDate(d.tarih)}</span>
        </div>
      </div>
    `).join('');
  }

  // Son videolar
  const videoEl = document.getElementById('son-videolar');
  if (videoEl) {
    videoEl.innerHTML = siteData.videolar.slice(0, 3).map(v => `
      <a href="video.html" class="feature-card" style="text-decoration:none;">
        <div class="feature-icon blue">🎬</div>
        <div class="feature-info">
          <h3>${v.baslik}</h3>
          <p>${v.kategori} • ${v.sure}</p>
        </div>
      </a>
    `).join('');
  }
}

// ---- YARDIMCI: TARİH FORMAT ----
function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
}

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---- LAZY LOAD POLYFILL ----
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('page-fade-in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.card').forEach(c => obs.observe(c));
}

// ---- BAŞLAT ----
document.addEventListener('DOMContentLoaded', async () => {
  initNav();
  initAccordion();
  await loadData();

  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '') renderAnasayfa();
  if (page === 'video.html') { renderVideolar(); initSearch('#video-ara', '[data-search]', 'data-search'); initChips('.chip', '.video-card', 'data-kat'); }
  if (page === 'yazili.html') { renderNotlar(); initSearch('#not-ara', '[data-search]', 'data-search'); initChips('.chip', '.not-card', 'data-kat'); }
  if (page === 'sonuclar.html') renderSonuclar();
});
