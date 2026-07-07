/* ============================================================
   Amine Jouhar — CV en ligne · interactions
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Éléments ALTRADIS (déclarés tôt pour la langue) ---------- */
  var adBtn = document.getElementById('altradisBtn');
  var adPanel = document.getElementById('altradisDetail');
  var adLabel = adBtn ? adBtn.querySelector('.ce-label') : null;

  function refreshAdLabel() {
    if (!adBtn || !adLabel) return;
    var lang = root.lang || 'fr';
    var open = adBtn.getAttribute('aria-expanded') === 'true';
    var key = 'data-' + lang + (open ? '-close' : '-open');
    var txt = adBtn.getAttribute(key);
    if (txt) adLabel.textContent = txt;
  }

  /* ---------- Bascule de langue FR / EN ---------- */
  var LANG_KEY = 'aj-lang';
  var langToggle = document.getElementById('langToggle');

  function applyLang(lang) {
    root.lang = lang;
    document.querySelectorAll('[data-fr]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val === null) return;
      if (el.tagName === 'META') { el.setAttribute('content', val); }
      else { el.innerHTML = val; }
    });
    if (langToggle) {
      langToggle.querySelector('.lang-fr').classList.toggle('active', lang === 'fr');
      langToggle.querySelector('.lang-en').classList.toggle('active', lang === 'en');
    }
    refreshAdLabel(); // corrige le libellé « Voir/Masquer » selon l'état
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  var savedLang = 'fr';
  try { savedLang = localStorage.getItem(LANG_KEY) || 'fr'; } catch (e) {}
  applyLang(savedLang);

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      applyLang(root.lang === 'fr' ? 'en' : 'fr');
    });
  }

  /* ---------- Thème clair / sombre ---------- */
  var THEME_KEY = 'aj-theme';
  var themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (!savedTheme) {
    savedTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Dépliage ALTRADIS ---------- */
  if (adBtn && adPanel) {
    adBtn.addEventListener('click', function () {
      var open = adPanel.classList.toggle('open');
      adBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      refreshAdLabel();
      if (open) {
        setTimeout(function () { adPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 200);
      }
    });
  }

  /* ---------- Logos entreprises / écoles (avec repli monogramme) ----------
     Si assets/logos/<nom>.png existe -> vrai logo ; sinon -> initiales stylisées.
     Déposez simplement le fichier logo pour qu'il apparaisse automatiquement. */
  document.querySelectorAll('.tl-logo[data-logo]').forEach(function (el) {
    var name = el.getAttribute('data-logo');
    el.textContent = el.getAttribute('data-initials') || ''; // repli monogramme
    var exts = ['png', 'svg', 'jpg']; // essaie ces extensions dans l'ordre
    var idx = 0;
    var img = new Image();
    img.alt = name;
    img.onload = function () {
      el.textContent = '';
      el.appendChild(img);
      el.classList.add('has-img');
    };
    img.onerror = function () {
      idx++;
      if (idx < exts.length) { img.src = 'assets/logos/' + name + '.' + exts[idx]; }
      // sinon : on garde le monogramme
    };
    img.src = 'assets/logos/' + name + '.' + exts[0];
  });

  /* ---------- Année du footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar : ombre au scroll ---------- */
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 10) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  function closeMenu() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Compteurs animés & barres de langues ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
    var dur = 1200, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('.stat-num[data-count]');
  var bars = document.querySelectorAll('.bar i[data-width]');

  function fillBar(el) { el.style.width = el.getAttribute('data-width'); }

  if ('IntersectionObserver' in window && !reduceMotion) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });

    var bo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { fillBar(e.target); bo.unobserve(e.target); } });
    }, { threshold: 0.4 });
    bars.forEach(function (el) { bo.observe(el); });
  } else {
    counters.forEach(animateCount);
    bars.forEach(fillBar);
  }

  /* ---------- Animations d'apparition au scroll ---------- */
  var revealTargets = document.querySelectorAll(
    '.tl-item, .card, .skill-group, .stat, .dl-col, .contact-card, .about-text, .section-title, .section-kicker'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }
})();
