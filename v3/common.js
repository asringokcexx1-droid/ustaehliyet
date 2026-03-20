/* ============================================================
   EhliyetUsta - Ortak Bileşenler (header, footer, helpers)
   ============================================================ */

// ---- NAV HTML ----
function getNavHTML(activePage) {
  const pages = [
    { href: 'index.html', label: '🏠 Ana Sayfa', key: 'index' },
    { href: 'video-dersler.html', label: '🎬 Video Dersler', key: 'video' },
    { href: 'pdf-notlar.html', label: '📄 Yazılı Notlar', key: 'notlar' },
    { href: 'ehliyet-sinav-sorulari.html', label: '📝 Online Sınav', key: 'sinav' },
    { href: 'sinav-sonuclari.html', label: '🏆 Sonuçlar', key: 'sonuclar' },
    { href: 'blog/index.html', label: '📰 Blog', key: 'blog' },
  ];
  return `
  <header class="site-header">
    <nav class="nav-container">
      <a href="index.html" class="logo" aria-label="EhliyetUsta Ana Sayfa">
        <div class="logo-icon" aria-hidden="true">E</div>
        <span class="logo-text">Ehliyet<span>Usta</span></span>
      </a>
      <button class="hamburger" id="hamburger-btn" aria-label="Menüyü aç/kapat" aria-expanded="false" aria-controls="main-nav">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-menu" id="main-nav" role="menubar">
        ${pages.map(p => `<li role="none"><a href="${p.href}" role="menuitem" class="${activePage === p.key ? 'active' : ''}">${p.label}</a></li>`).join('')}
        <li role="none"><a href="ehliyet-sinav-sorulari.html" class="nav-cta" role="menuitem">🚀 Sınava Başla</a></li>
      </ul>
    </nav>
  </header>`;
}

// ---- FOOTER HTML ----
function getFooterHTML() {
  return `
  <footer class="footer" itemscope itemtype="https://schema.org/Organization">
    <div class="footer-grid">
      <div>
        <div class="logo" style="margin-bottom:16px">
          <div class="logo-icon">E</div>
          <span class="logo-text" style="color:white" itemprop="name">Ehliyet<span>Usta</span></span>
        </div>
        <p style="font-size:0.875rem;max-width:280px;line-height:1.7" itemprop="description">
          Türkiye'nin en kapsamlı online sürücü kursu. MEB onaylı içerikler, tamamen ücretsiz erişim.
        </p>
        <div class="social-icons">
          <a href="https://facebook.com/ehliyetusta" target="_blank" rel="noopener" class="social-icon" aria-label="Facebook sayfamız" itemprop="sameAs" title="EhliyetUsta Facebook">f</a>
          <a href="https://instagram.com/ehliyetusta" target="_blank" rel="noopener" class="social-icon" aria-label="Instagram" itemprop="sameAs" title="EhliyetUsta Instagram">📷</a>
          <a href="https://youtube.com/@ehliyetusta" target="_blank" rel="noopener" class="social-icon" aria-label="YouTube kanalımız" itemprop="sameAs" title="EhliyetUsta YouTube">▶</a>
          <a href="https://twitter.com/ehliyetusta" target="_blank" rel="noopener" class="social-icon" aria-label="Twitter/X" itemprop="sameAs" title="EhliyetUsta Twitter">𝕏</a>
        </div>
      </div>
      <div>
        <h3>Hızlı Linkler</h3>
        <ul class="footer-links">
          <li><a href="index.html">Ana Sayfa</a></li>
          <li><a href="video-dersler.html">Video Dersler</a></li>
          <li><a href="pdf-notlar.html">Yazılı Notlar & PDF</a></li>
          <li><a href="ehliyet-sinav-sorulari.html">Online Sınav</a></li>
          <li><a href="sinav-sonuclari.html">Sınav Sonuçları</a></li>
          <li><a href="blog/index.html">Blog</a></li>
        </ul>
      </div>
      <div>
        <h3>Kategoriler</h3>
        <ul class="footer-links">
          <li><a href="trafik-isaretleri.html">Trafik İşaretleri</a></li>
          <li><a href="ilk-yardim.html">İlk Yardım</a></li>
          <li><a href="motor-bilgisi.html">Motor Bilgisi</a></li>
          <li><a href="video-dersler.html">Sürüş Teknikleri</a></li>
          <li><a href="pdf-notlar.html">PDF İndir</a></li>
        </ul>
      </div>
      <div>
        <h3>Kurumsal</h3>
        <ul class="footer-links">
          <li><a href="hakkimizda.html">Hakkımızda</a></li>
          <li><a href="iletisim.html">İletişim</a></li>
          <li><a href="gizlilik-politikasi.html">Gizlilik Politikası</a></li>
          <li><a href="kvkk.html">KVKK</a></li>
          <li><a href="kullanim-kosullari.html">Kullanım Koşulları</a></li>
        </ul>
        <p style="font-size:0.8rem;margin-top:14px;color:rgba(255,255,255,0.5)" itemprop="telephone">📱 0532 000 00 00</p>
        <p style="font-size:0.8rem;color:rgba(255,255,255,0.5)" itemprop="email">✉️ info@ehliyetusta.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 EhliyetUsta. Tüm hakları saklıdır.</span>
      <span style="display:flex;gap:16px">
        <a href="gizlilik-politikasi.html" style="color:rgba(255,255,255,0.5)">Gizlilik</a>
        <a href="kvkk.html" style="color:rgba(255,255,255,0.5)">KVKK</a>
        <a href="kullanim-kosullari.html" style="color:rgba(255,255,255,0.5)">Koşullar</a>
      </span>
    </div>
  </footer>`;
}

// ---- ÇEREZ BANNER ----
function getCookieBanner() {
  if (localStorage.getItem('cookie_ok')) return '';
  return `
  <div id="cookie-banner" role="dialog" aria-label="Çerez bildirimi" style="position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#1a202c;color:white;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;box-shadow:0 -4px 24px rgba(0,0,0,0.3)">
    <p style="font-size:0.875rem;color:rgba(255,255,255,0.85);max-width:680px;margin:0">
      🍪 Bu site deneyiminizi iyileştirmek için çerezler kullanmaktadır.
      <a href="gizlilik-politikasi.html" style="color:#60a5fa;text-decoration:underline">Gizlilik Politikası</a> ve
      <a href="kvkk.html" style="color:#60a5fa;text-decoration:underline">KVKK Aydınlatma Metni</a>'ni inceleyebilirsiniz.
    </p>
    <div style="display:flex;gap:10px;flex-shrink:0">
      <button onclick="document.getElementById('cookie-banner').remove();localStorage.setItem('cookie_ok','1')" style="background:#00c896;color:white;padding:9px 22px;border-radius:8px;border:none;font-weight:700;cursor:pointer;font-size:0.875rem">✅ Kabul Et</button>
      <button onclick="document.getElementById('cookie-banner').remove()" style="background:rgba(255,255,255,0.1);color:white;padding:9px 22px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);font-weight:700;cursor:pointer;font-size:0.875rem">Reddet</button>
    </div>
  </div>`;
}

// ---- NAV JS ----
function initNav() {
  const btn = document.getElementById('hamburger-btn');
  const menu = document.getElementById('main-nav');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });
  }
}

// ---- TOAST ----
function showToast(msg, type = 'default', dur = 3500) {
  let c = document.getElementById('toast-c');
  if (!c) { c = document.createElement('div'); c.id = 'toast-c'; c.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px'; document.body.appendChild(c); }
  const icons = { success: '✅', error: '❌', warning: '⚠️', default: 'ℹ️' };
  const t = document.createElement('div');
  t.style.cssText = `background:${type==='success'?'#00a87a':type==='error'?'#e53e3e':type==='warning'?'#ffb800':'#2d3748'};color:${type==='warning'?'#1a202c':'white'};padding:14px 20px;border-radius:10px;font-size:0.875rem;font-weight:600;box-shadow:0 8px 32px rgba(0,0,0,0.15);display:flex;align-items:center;gap:8px;min-width:260px;animation:toastIn 0.3s ease`;
  t.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${msg}`;
  const style = document.createElement('style');
  style.textContent = '@keyframes toastIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}';
  document.head.appendChild(style);
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(120%)'; t.style.transition = 'all 0.3s'; setTimeout(() => t.remove(), 300); }, dur);
}

// ---- ACCORDION ----
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => h.closest('.accordion-item').classList.toggle('open'));
  });
}

// ---- İÇ LİNK YÖNLENDİRME HELPER ----
function buildBreadcrumb(items) {
  // items: [{label, url}]
  return `<nav aria-label="Sayfa yolu" style="font-size:0.8rem;color:var(--text-muted);margin-bottom:16px">
    ${items.map((it, i) => i < items.length - 1
      ? `<a href="${it.url}" style="color:var(--primary);text-decoration:none">${it.label}</a> <span style="margin:0 6px">›</span>`
      : `<span aria-current="page">${it.label}</span>`
    ).join('')}
  </nav>`;
}

// ---- İLGİLİ MAKALELER ----
function buildRelatedPosts(posts) {
  return `<div style="background:var(--gray-bg);border-radius:var(--radius-lg);padding:24px;margin-top:40px">
    <h3 style="font-family:var(--font-heading);font-size:1.1rem;margin-bottom:16px">📚 İlgili Makaleler</h3>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${posts.map(p => `<a href="${p.url}" style="display:flex;align-items:center;gap:10px;padding:12px;background:white;border-radius:8px;border:1px solid var(--border);text-decoration:none;color:var(--text);transition:all 0.2s" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
        <span style="font-size:1.4rem;flex-shrink:0">${p.icon}</span>
        <div><div style="font-weight:700;font-size:0.9rem">${p.title}</div><div style="font-size:0.75rem;color:var(--text-muted)">${p.meta}</div></div>
        <span style="margin-left:auto;color:var(--primary)">→</span>
      </a>`).join('')}
    </div>
  </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAccordion();
  if (!localStorage.getItem('cookie_ok')) {
    const banner = document.createElement('div');
    banner.innerHTML = getCookieBanner();
    const b = banner.firstElementChild;
    if (b) document.body.appendChild(b);
  }
});
