/* =====================================================================
   ♥  EDIT ME  ♥
   Everything personal lives in this CONFIG block. Change any text
   here, then save.
   You can use {name} (her name) and {from} (your name) inside any
   text and they will be filled in automatically.
   ===================================================================== */
const CONFIG = {
  /* --- The basics ---------------------------------------------------- */
  herName: "Laiba John",
  fromName: "John Iqbal",
  pageTitle: "Happy Birthday, {name}",

  /* Her birthday (month 1–12, day 1–31). The countdown runs to it and the
     surprise unlocks at midnight (the visitor's local time) when the day begins.
     Tip: add ?preview to the link (e.g. index.html?preview) to unlock the
     surprise any time, so you can test it. */
  birthday: { month: 11, day: 3 },
  previewUnlocked: false, // set true to always show the unlocked surprise

  /* --- Hero (first screen) ------------------------------------------- */
  heroEyebrow: "Happy Birthday",
  heroPhoto: "", // optional, e.g. "photos/her.jpg" (leave "" for no photo)
  heroGreeting: "Today is all about celebrating you, the woman, partner, and best friend you are to me every single day.",
  scrollLabel: "Open your letter",

  /* --- The letter ---------------------------------------------------- */
  letterEyebrow: "A letter for you",
  letterGreeting: "My love,",
  personalMessage: [
    "Happy birthday to the woman who holds my entire world together, my beautiful wifey. Today is all about celebrating you—not just the day you were born, but the incredible woman, partner, and best friend you are to me every single day. You have this unique way of making even the most ordinary days feel extraordinary, turning our house into a true home filled with endless warmth, peace, and laughter. Walking through life next to you is the greatest privilege I could ever ask for, and I want you to know how deeply you are loved, valued, and cherished.",
    "Thank you for being my rock, my safest haven, and my absolute favorite part of every day. Your strength inspires me, your kindness grounds me, and your beautiful smile still manages to stop me in my tracks just like the very first day. I am incredibly grateful for the patience you show, the unconditional love you give, and the quiet moments we share when the rest of the world gets too noisy. You are the heart and soul of everything I hold dear, and I would choose you over and over again, in a thousand lifetimes.",
    "As you start this new chapter and take another beautiful trip around the sun, my biggest wish is for your heart to be filled with the same boundless joy you constantly give to everyone around you. May this year bring you closer to all your dreams, bless you with perfect health, and shower you with the happiness you so deeply deserve. I promise to stand by you through every step, celebrating your victories and holding your hand through any storm. Cheers to you, my love, and to a beautiful day and an even brighter year ahead!"
  ],
  signoff: "Forever yours,",

  /* --- Reasons I love you (rotating cards; add or remove freely) ------ */
  reasonsEyebrow: "Just a few of them",
  reasonsTitle: "Reasons I love you",
  reasons: [
    "You are my rock, my safest haven, and my absolute favorite part of every day.",
    "You turn even the most ordinary days into something extraordinary.",
    "You made our house a true home, filled with warmth, peace, and laughter.",
    "Your strength inspires me, and your kindness keeps me grounded.",
    "Your smile still stops me in my tracks, just like the very first day.",
    "Your patience and unconditional love carry us through, especially in the quiet moments when the world gets too noisy."
  ],

  /* --- Memories (scrolling timeline) -----------------------------------
     Left empty on purpose, so that section is hidden. To add your own, paste
     entries like this between the brackets (photo is optional, e.g.
     "photos/first-trip.jpg"):
       { title: "Our first trip", date: "June 2019", text: "What happened...", photo: "" },  */
  memoriesEyebrow: "Our story, in small pieces",
  memoriesTitle: "Memories I hold close",
  memories: [],

  /* --- The birthday moment (countdown + reveal) ---------------------- */
  momentEyebrow: "A little something",
  momentTitle: "Your moment is almost here",
  momentTitleUnlocked: "Your moment is here",
  momentLockedNote: "Come back when the countdown ends. There is a surprise waiting, just for you.",
  momentUnlockedNote: "It is your day, and I have something to show you.",
  momentButton: "Open your surprise",

  surpriseEyebrow: "For you, with all my love",
  surpriseTitle: "Happy Birthday, {name}",
  surpriseMessage: "I would choose you over and over again, in a thousand lifetimes. Cheers to you, my love, and to a beautiful day and an even brighter year ahead!",
  surpriseClose: "Keep the magic going",

  /* --- Closing ------------------------------------------------------- */
  closingTitle: "Happy Birthday, {name}",
  closingMessage: "I promise to stand by you through every step, celebrating your victories and holding your hand through any storm.",
  replayLabel: "Celebrate again",
  footerNote: "Made with love, only for you",

  /* --- Optional music ------------------------------------------------
     Put an audio file next to index.html (e.g. "song.mp3") and set it here.
     A small ♪ button will appear. Leave "" for no music. */
  music: ""
};

/* =====================================================================
   Below this line is the app. You shouldn't need to change anything.
   ===================================================================== */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReduced = () => reducedMQ.matches;

  const fill = (str) => String(str)
    .replace(/\{name\}/g, CONFIG.herName)
    .replace(/\{from\}/g, CONFIG.fromName);

  /* ---------- Text binding ---------- */
  function bindText() {
    document.title = fill(CONFIG.pageTitle);
    $$('[data-bind]').forEach((el) => {
      const value = CONFIG[el.dataset.bind];
      if (typeof value === 'string') el.textContent = fill(value);
    });
  }

  /* ---------- Hero portrait ---------- */
  function buildPortrait() {
    const box = $('#portrait');
    if (!box || !CONFIG.heroPhoto) return;
    const img = new Image();
    img.alt = fill('{name}');
    img.decoding = 'async';
    img.onload = () => { box.appendChild(img); box.hidden = false; };
    img.onerror = () => { box.remove(); };
    img.src = CONFIG.heroPhoto;
  }

  /* ---------- Letter ---------- */
  function buildLetter() {
    const body = $('#letterBody');
    if (!body) return;
    CONFIG.personalMessage.forEach((text) => {
      const p = document.createElement('p');
      p.textContent = fill(text);
      body.appendChild(p);
    });
  }

  /* ---------- Floating hearts ---------- */
  function makeHearts(container, count) {
    if (!container || prefersReduced()) return;
    const colors = ['#e59aa8', '#d9768a', '#f0b9b9', '#d9b377', '#f3cfc3'];
    const travel = -(container.offsetHeight + 90);
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.textContent = '\u2665';
      s.style.setProperty('--x', rand(2, 96).toFixed(1) + '%');
      s.style.setProperty('--s', rand(0.8, 1.9).toFixed(2) + 'rem');
      s.style.setProperty('--t', rand(12, 24).toFixed(1) + 's');
      s.style.setProperty('--delay', (-rand(0, 22)).toFixed(1) + 's');
      s.style.setProperty('--dx', rand(-70, 70).toFixed(0) + 'px');
      s.style.setProperty('--r', rand(-40, 40).toFixed(0) + 'deg');
      s.style.setProperty('--c', pick(colors));
      s.style.setProperty('--travel', travel + 'px');
      container.appendChild(s);
    }
  }

  /* ---------- Confetti & petals ---------- */
  const Confetti = (function () {
    const canvas = $('#confetti');
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    const COLORS = ['#e59aa8', '#f3c6c6', '#d9768a', '#ebd6a8', '#c9a05a', '#ffffff', '#f6dcd2'];
    const SHAPES = ['heart', 'petal', 'petal', 'rect'];
    let W = 0, H = 0, dpr = 1, parts = [], raf = 0, last = 0, rainUntil = 0, rainRate = 0;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function particle(x, y, vx, vy, gravity, terminal, max) {
      return {
        x, y, vx, vy, g: gravity, term: terminal, max,
        rot: rand(0, 6.28), vr: rand(-0.07, 0.07),
        size: rand(8, 16), color: pick(COLORS), shape: pick(SHAPES),
        sway: rand(0, 6.28), swayV: rand(0.02, 0.06), swayA: rand(0.2, 0.7), life: 0
      };
    }

    function add(p) { if (parts.length < 450) parts.push(p); }

    function draw(p, alpha) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      const flip = Math.abs(Math.cos(p.sway * 1.8));
      if (p.shape === 'heart') {
        const s = p.size * 0.5;
        ctx.scale(Math.max(0.6, flip), 1);
        ctx.beginPath();
        ctx.moveTo(0, s * 0.9);
        ctx.bezierCurveTo(-s * 1.3, -s * 0.1, -s * 0.6, -s * 1, 0, -s * 0.35);
        ctx.bezierCurveTo(s * 0.6, -s * 1, s * 1.3, -s * 0.1, 0, s * 0.9);
        ctx.fill();
      } else if (p.shape === 'petal') {
        ctx.scale(1, Math.max(0.25, flip));
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.32, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.scale(1, Math.max(0.2, flip));
        ctx.fillRect(-p.size * 0.3, -p.size * 0.18, p.size * 0.6, p.size * 0.36);
      }
      ctx.restore();
    }

    function frame(t) {
      raf = 0;
      const dt = Math.min(2.5, (t - last) / 16.667 || 1);
      last = t;
      ctx.clearRect(0, 0, W, H);

      if (t < rainUntil) {
        const n = Math.floor(rainRate * dt + Math.random());
        for (let i = 0; i < n; i++) {
          const vy = rand(1.1, 2.4);
          add(particle(rand(0, W), -20, rand(-0.4, 0.4), vy, 0.01, 2.6, (H + 80) / vy * rand(1.1, 1.5)));
        }
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vx *= Math.pow(0.985, dt);
        p.vy = Math.min(p.vy + p.g * dt, p.term);
        p.sway += p.swayV * dt;
        p.x += (p.vx + Math.sin(p.sway) * p.swayA) * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.life += dt;
        const fadeStart = p.max * 0.75;
        const alpha = p.life > fadeStart ? 1 - (p.life - fadeStart) / (p.max - fadeStart) : 1;
        if (alpha <= 0 || p.y > H + 30) { parts.splice(i, 1); continue; }
        draw(p, alpha);
      }

      if (parts.length || t < rainUntil) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (!ctx || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    /* A shower of petals and hearts falling from the top. */
    function rain(ms, rate) {
      if (!ctx || prefersReduced()) return;
      rainUntil = performance.now() + (ms || 5000);
      rainRate = rate || 0.7;
      start();
    }

    /* A burst from a point. cone=true shoots upward like a party popper. */
    function burst(x, y, n, cone) {
      if (!ctx || prefersReduced()) return;
      for (let i = 0; i < n; i++) {
        const angle = cone ? -Math.PI / 2 + rand(-0.85, 0.85) : rand(0, Math.PI * 2);
        const speed = cone ? rand(8, 16) : rand(3, 10);
        add(particle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, 0.2, 4, rand(150, 260)));
      }
      start();
    }

    function celebrate() {
      if (!ctx || prefersReduced()) return;
      burst(W * 0.18, H * 0.85, 70, true);
      burst(W * 0.82, H * 0.85, 70, true);
      setTimeout(() => burst(W * 0.5, H * 0.45, 110, false), 280);
      rain(6500, 0.9);
    }

    window.addEventListener('resize', resize);
    resize();
    return { rain, burst, celebrate };
  })();

  /* ---------- Reasons carousel ---------- */
  function buildReasons() {
    const section = $('#reasons');
    const stage = $('#reasonStage');
    const dotsBox = $('#reasonDots');
    const carousel = $('#carousel');
    const prev = $('#reasonPrev');
    const next = $('#reasonNext');
    const items = CONFIG.reasons || [];
    if (!section || !stage) return;
    if (!items.length) { section.hidden = true; return; }

    const slides = [];
    const dots = [];
    items.forEach((text, i) => {
      const slide = document.createElement('div');
      slide.className = 'reason';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', (i + 1) + ' of ' + items.length);
      const num = document.createElement('p');
      num.className = 'reason-num';
      num.textContent = 'Reason ' + String(i + 1).padStart(2, '0');
      const body = document.createElement('p');
      body.className = 'reason-text';
      body.textContent = fill(text);
      slide.appendChild(num);
      slide.appendChild(body);
      stage.appendChild(slide);
      slides.push(slide);

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('aria-label', 'Show reason ' + (i + 1));
      dot.addEventListener('click', () => { userTook(); go(i); });
      dotsBox.appendChild(dot);
      dots.push(dot);
    });

    let index = 0, timer = null, visible = false, hovering = false, userStopped = false;

    function go(n) {
      index = (n + items.length) % items.length;
      slides.forEach((s, i) => {
        const active = i === index;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
    }

    function sync() {
      const should = visible && !hovering && !userStopped && !prefersReduced() &&
        !document.hidden && items.length > 1;
      if (should && !timer) timer = setInterval(() => go(index + 1), 6500);
      else if (!should && timer) { clearInterval(timer); timer = null; }
    }

    function userTook() {
      userStopped = true;
      stage.setAttribute('aria-live', 'polite');
      sync();
    }

    prev.addEventListener('click', () => { userTook(); go(index - 1); });
    next.addEventListener('click', () => { userTook(); go(index + 1); });
    if (items.length < 2) { prev.hidden = true; next.hidden = true; dotsBox.hidden = true; }

    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { userTook(); go(index - 1); }
      if (e.key === 'ArrowRight') { userTook(); go(index + 1); }
    });
    carousel.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hovering = true; sync(); } });
    carousel.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hovering = false; sync(); } });

    /* Swipe on touch screens */
    let startX = null;
    stage.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    stage.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) { userTook(); go(index + (dx < 0 ? 1 : -1)); }
    });
    stage.addEventListener('pointercancel', () => { startX = null; });

    document.addEventListener('visibilitychange', sync);
    if (reducedMQ.addEventListener) reducedMQ.addEventListener('change', sync);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        sync();
      }, { threshold: 0.35 }).observe(carousel);
    } else {
      visible = true;
    }

    go(0);
    sync();
  }

  /* ---------- Memories ---------- */
  function buildMemories() {
    const section = $('#memories');
    const box = $('#timeline');
    const items = CONFIG.memories || [];
    if (!section || !box) return;
    if (!items.length) { section.hidden = true; return; }

    items.forEach((m) => {
      const wrap = document.createElement('article');
      wrap.className = 'memory rv';
      const card = document.createElement('div');
      card.className = 'memory-card';

      if (m.photo) {
        const fig = document.createElement('figure');
        fig.className = 'memory-photo';
        fig.style.margin = '-0.2rem 0 1.1rem';
        const img = new Image();
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = fill(m.title || '');
        img.onerror = () => { fig.remove(); };
        img.src = m.photo;
        fig.appendChild(img);
        card.appendChild(fig);
      }
      if (m.date) {
        const d = document.createElement('p');
        d.className = 'memory-date';
        d.textContent = fill(m.date);
        card.appendChild(d);
      }
      const h = document.createElement('h3');
      h.className = 'memory-title';
      h.textContent = fill(m.title || '');
      const t = document.createElement('p');
      t.className = 'memory-text';
      t.textContent = fill(m.text || '');
      card.appendChild(h);
      card.appendChild(t);
      wrap.appendChild(card);
      box.appendChild(wrap);
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const els = $$('.rv');
    if (!('IntersectionObserver' in window) || prefersReduced()) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Countdown + surprise ---------- */
  function birthdayState(now) {
    const m = CONFIG.birthday.month - 1;
    const d = CONFIG.birthday.day;
    const y = now.getFullYear();
    const start = new Date(y, m, d);
    const end = new Date(y, m, d + 1);
    if (now >= start && now < end) return { unlocked: true, target: start };
    if (now < start) return { unlocked: false, target: start };
    return { unlocked: false, target: new Date(y + 1, m, d) };
  }

  function initMoment() {
    const locked = $('#locked');
    const unlocked = $('#unlocked');
    const title = $('#momentTitle');
    const cd = { d: $('#cdDays'), h: $('#cdHours'), m: $('#cdMins'), s: $('#cdSecs') };
    if (!locked || !unlocked) return;

    const forced = CONFIG.previewUnlocked || new URLSearchParams(window.location.search).has('preview');
    let timer = null;
    let wasLocked = null;

    function showUnlocked() {
      locked.hidden = true;
      unlocked.hidden = false;
      unlocked.classList.add('in');
      title.textContent = fill(CONFIG.momentTitleUnlocked);
      if (wasLocked === true) Confetti.rain(5000, 0.6);
      wasLocked = false;
      if (timer) { clearInterval(timer); timer = null; }
    }

    function tick() {
      const now = new Date();
      const st = birthdayState(now);
      if (st.unlocked || forced) { showUnlocked(); return; }
      wasLocked = true;
      const total = Math.max(0, Math.floor((st.target - now) / 1000));
      const days = Math.floor(total / 86400);
      const hrs = Math.floor((total % 86400) / 3600);
      const mins = Math.floor((total % 3600) / 60);
      const secs = total % 60;
      cd.d.textContent = String(days).padStart(2, '0');
      cd.h.textContent = String(hrs).padStart(2, '0');
      cd.m.textContent = String(mins).padStart(2, '0');
      cd.s.textContent = String(secs).padStart(2, '0');
    }

    tick();
    if (!unlocked.hidden) return;
    timer = setInterval(tick, 1000);
  }

  /* ---------- Surprise overlay ---------- */
  function initSurprise() {
    const overlay = $('#surprise');
    const openBtn = $('#openSurprise');
    const closeBtn = $('#closeSurprise');
    if (!overlay || !openBtn || !closeBtn) return;
    let lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      overlay.hidden = false;
      document.body.classList.add('no-scroll');
      requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('is-open')));
      closeBtn.focus({ preventScroll: true });
      Confetti.celebrate();
    }

    function close() {
      overlay.classList.remove('is-open');
      const done = () => {
        overlay.hidden = true;
        document.body.classList.remove('no-scroll');
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      };
      if (prefersReduced()) done(); else setTimeout(done, 600);
    }

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => {
      if (overlay.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
    });
  }

  /* ---------- Replay ---------- */
  function initReplay() {
    const btn = $('#replay');
    if (btn) btn.addEventListener('click', () => Confetti.celebrate());
  }

  /* ---------- Optional music ---------- */
  function initMusic() {
    const btn = $('#musicToggle');
    if (!btn || !CONFIG.music) return;
    btn.hidden = false;
    let audio = null;
    btn.addEventListener('click', () => {
      if (!audio) {
        audio = new Audio(CONFIG.music);
        audio.loop = true;
        audio.addEventListener('error', () => { btn.hidden = true; });
      }
      if (audio.paused) {
        const p = audio.play();
        const on = () => {
          btn.classList.add('is-playing');
          btn.setAttribute('aria-pressed', 'true');
          btn.setAttribute('aria-label', 'Pause music');
        };
        if (p && p.then) p.then(on).catch(() => { btn.hidden = true; }); else on();
      } else {
        audio.pause();
        btn.classList.remove('is-playing');
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-label', 'Play music');
      }
    });
  }

  /* ---------- Go! ---------- */
  function init() {
    bindText();
    buildPortrait();
    buildLetter();
    buildReasons();
    buildMemories();
    makeHearts($('#heartsHero'), 16);
    makeHearts($('#heartsClosing'), 10);
    initReveal();
    initMoment();
    initSurprise();
    initReplay();
    initMusic();
    setTimeout(() => Confetti.rain(4500, 0.45), 700);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
