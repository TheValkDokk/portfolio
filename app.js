/* Cao Chanh Duc — the page's behaviour. Everything degrades to a readable page. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. the name fills its line, whatever the viewport */
  var nameEl = document.querySelector('.name');
  var nameIn = document.querySelector('.name-in');
  function fitName() {
    if (!nameEl || !nameIn) return;
    nameEl.style.setProperty('--name-size', '100px');
    var box = nameEl.getBoundingClientRect().width;
    var w = nameIn.getBoundingClientRect().width;
    if (!box || !w) return;
    var size = 100 * (box * 0.998 / w);
    nameEl.style.setProperty('--name-size', size.toFixed(2) + 'px');
  }
  fitName();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);
  var fitTimer;
  window.addEventListener('resize', function () {
    clearTimeout(fitTimer);
    fitTimer = setTimeout(fitName, 120);
  });

  /* 2. the fixed half shows the thing you are reading about */
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  var current = 'hero';
  function showShot(key) {
    if (!key || key === current) return;
    var found = shots.some(function (s) { return s.dataset.shot === key; });
    if (!found) return;
    current = key;
    shots.forEach(function (s) { s.classList.toggle('is-on', s.dataset.shot === key); });
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-shot-target]'));
  if ('IntersectionObserver' in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) showShot(e.target.dataset.shotTarget);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  Array.prototype.slice.call(document.querySelectorAll('.roster a[data-shot]')).forEach(function (a) {
    var set = function () { showShot(a.dataset.shot); };
    var back = function () { showShot(currentSectionShot()); };
    a.addEventListener('mouseenter', set);
    a.addEventListener('focus', set);
    a.addEventListener('mouseleave', back);
    a.addEventListener('blur', back);
  });
  function currentSectionShot() {
    var mid = window.innerHeight / 2, best = 'hero', bestD = Infinity;
    sections.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) { best = s.dataset.shotTarget; bestD = 0; }
    });
    return bestD === 0 ? best : current;
  }

  /* 3. the trace: three flows, one at a time */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.trace-tabs [role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.flow'));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (p) {
      p.hidden = p.id !== tab.getAttribute('aria-controls');
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next); next.focus(); }
    });
  });
  if (tabs.length && !document.querySelector('.flow:not([hidden])')) selectTab(tabs[0]);

  /* 4. entrances: parts of a section arrive one after another */
  if (!reduce && 'IntersectionObserver' in window) {
    var groups = document.querySelectorAll('.read > section, .band, .letter, .contact, .hero');
    groups.forEach(function (group) {
      var parts = group.querySelectorAll('h2, .lede, p, dl, figure, ol.roster, .trace, .cols');
      Array.prototype.forEach.call(parts, function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
      });
    });
    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); rv.unobserve(e.target); }
      });
    }, { rootMargin: '700px 0px 700px 0px', threshold: 0 });
    document.querySelectorAll('.reveal').forEach(function (el) { rv.observe(el); });
    document.querySelector('.hero').querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* 5. the one field opens an email with the line written */
  var form = document.querySelector('[data-mailto]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      var line = (input && input.value || '').trim() || 'Hello — I read your page.';
      var href = 'mailto:duccaochanh@gmail.com' +
        '?subject=' + encodeURIComponent('One engineer, one line') +
        '&body=' + encodeURIComponent(line + '\n\n');
      window.location.href = href;
    });
  }
})();
