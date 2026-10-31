/* Motion effects. Each one is switched on/off in content/site-data.js → effects. */
(function () {
  'use strict';
  const FX = (window.SITE && window.SITE.effects) || {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const cssVar = (name) => getComputedStyle(root).getPropertyValue(name).trim();

  // Reading-progress bar
  if (FX.progressBar) {
    const bar = document.createElement('div');
    bar.className = 'progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);
    const update = () => {
      const max = root.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  // Stat numbers count up ("8" → 0..8, "11/12" → 0..11 then "/12"; words stay as they are)
  if (FX.countUp && !reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const m = e.target.textContent.match(/^(\d+)(.*)$/);
      if (!m) return;
      const end = +m[1], rest = m[2], t0 = performance.now(), dur = 1200;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + rest;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    document.querySelectorAll('.stat strong').forEach((el) => io.observe(el));
  }

  // Lanyard ID badge: drag to swing, pull down to stretch the strap, tap to flip, sways when the page scrolls
  const lan = document.getElementById('lanyard');
  if (lan) {
    const badge = lan.querySelector('.badge');
    const strap = lan.querySelector('.strap');
    const clip = lan.querySelector('.clip');
    const wrap = lan.parentElement;
    let angle = 0, vel = 0, y = 0, yVel = 0, stretch = 0, sVel = 0, grabDist = 0;
    let dragging = false, moved = false, suppressClick = false, start = null, running = false, visible = true;
    const MAX = 65, MAX_STRETCH = 170;

    const render = () => {
      lan.style.transform = `translateY(${y.toFixed(2)}px) rotate(${angle.toFixed(2)}deg)`;
      // scale the strap (stripes run vertically, so they don't distort) and move clip + card down with it
      strap.style.transform = `scaleY(${((strap.offsetHeight + stretch) / strap.offsetHeight).toFixed(4)})`;
      clip.style.transform = badge.style.transform = `translateY(${stretch.toFixed(2)}px)`;
    };
    const loop = () => {
      if (!dragging) {
        vel += -0.025 * angle - 0.06 * vel;   // spring back to hanging straight, with damping
        angle = Math.max(-MAX, Math.min(MAX, angle + vel));
        sVel += -0.09 * stretch - 0.1 * sVel; // elastic recoil: overshoots up a little, then settles
        stretch = Math.max(-25, stretch + sVel);
      }
      yVel += -0.08 * y - 0.18 * yVel;
      y += yVel;
      render();
      const still = (a, b) => Math.abs(a) < 0.03 && Math.abs(b) < 0.03;
      const settled = !dragging && still(angle, vel) && still(y, yVel) && still(stretch, sVel);
      if (settled || !visible) { running = false; if (settled) { angle = vel = y = yVel = stretch = sVel = 0; render(); } return; }
      requestAnimationFrame(loop);
    };
    const anchor = () => { const r = wrap.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top }; }; // strap hangs from top centre
    const wake = () => { if (!running && !reduce) { running = true; requestAnimationFrame(loop); } };

    badge.addEventListener('click', () => {
      if (suppressClick) { suppressClick = false; return; }
      const flipped = badge.classList.toggle('flipped');
      badge.setAttribute('aria-pressed', flipped);
      vel += flipped ? 2.5 : -2.5; // small wobble on flip
      wake();
    });

    if (!reduce) {
      badge.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        dragging = true; moved = false;
        start = { x: e.clientX, y: e.clientY };
        const a = anchor();
        grabDist = Math.hypot(e.clientX - a.x, e.clientY - a.y) - stretch; // length at rest, measured to the grab point
        badge.setPointerCapture(e.pointerId);
        wake();
      });
      badge.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        if (!moved && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) moved = true;
        if (!moved) return;
        const a = anchor();
        const dx = e.clientX - a.x, dy = e.clientY - a.y;
        const next = Math.max(-MAX, Math.min(MAX, -Math.atan2(dx, Math.max(20, dy)) * 180 / Math.PI));
        vel = next - angle;
        angle = next;
        const pull = Math.hypot(dx, dy) - grabDist;
        const nextStretch = pull > 0 ? MAX_STRETCH * (1 - Math.exp(-pull / MAX_STRETCH)) : 0; // gets harder to pull the further it goes
        sVel = nextStretch - stretch;
        stretch = nextStretch;
      });
      const end = () => { if (!dragging) return; dragging = false; if (moved) suppressClick = true; wake(); };
      badge.addEventListener('pointerup', end);
      badge.addEventListener('pointercancel', end);

      let lastY = scrollY;
      addEventListener('scroll', () => {
        const dy = scrollY - lastY;
        lastY = scrollY;
        if (!visible) return;
        vel += Math.max(-1.5, Math.min(1.5, dy * 0.04));
        yVel += Math.max(-3, Math.min(3, -dy * 0.12));
        wake();
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) wake(); }).observe(wrap);
      }
    }
  }

  // Data network: drifting points joined by lines, reaching towards the cursor
  const cvs = document.querySelector('.hero-canvas');
  if (cvs && !reduce) {
    const ctx = cvs.getContext('2d');
    const LINK = 130, MOUSE = 170;
    let w = 0, h = 0, dpr = 1, pts = [], mouse = null, accent = '', ink = '', frame = 0, visible = true, raf = 0;

    const size = () => {
      dpr = Math.min(2, devicePixelRatio || 1);
      w = cvs.clientWidth; h = cvs.clientHeight;
      cvs.width = w * dpr; cvs.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(90, Math.round((w * h) / 16000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    };
    const colors = () => { accent = cssVar('--accent'); ink = cssVar('--muted'); };

    const draw = () => {
      if (frame++ % 30 === 0) colors(); // picks up light/dark switches
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.22;
            ctx.strokeStyle = ink;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        if (mouse) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < MOUSE) {
            ctx.globalAlpha = (1 - d / MOUSE) * 0.6;
            ctx.strokeStyle = accent;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        const near = mouse && Math.hypot(p.x - mouse.x, p.y - mouse.y) < MOUSE;
        ctx.globalAlpha = near ? 0.9 : 0.45;
        ctx.fillStyle = near ? accent : ink;
        ctx.beginPath(); ctx.arc(p.x, p.y, near ? 2.4 : 1.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = visible && !document.hidden ? requestAnimationFrame(draw) : 0;
    };
    const start = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw); };

    size(); colors(); start();
    addEventListener('resize', size);
    addEventListener('pointermove', (e) => {
      const r = cvs.getBoundingClientRect();
      mouse = e.pointerType === 'mouse' ? { x: e.clientX - r.left, y: e.clientY - r.top } : null;
    }, { passive: true });
    document.addEventListener('pointerleave', () => { mouse = null; });
    document.addEventListener('visibilitychange', start);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); }).observe(cvs);
    }
  }
})();
