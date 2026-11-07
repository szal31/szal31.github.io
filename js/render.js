/* Builds the page from content/site-data.js. Buyers don't need to edit this file. */
(function () {
  'use strict';
  const S = window.SITE;
  const main = document.getElementById('main');
  if (!S) {
    main.innerHTML = '<p class="wrap section">Could not load <code>content/site-data.js</code>. Check it for a missing comma or quote.</p>';
    return;
  }
  const P = S.person || {};
  const FX = S.effects || {};
  const projects = (S.work && S.work.projects) || [];

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rich = (v) => esc(v).replace(/\*(.+?)\*/g, '<em>$1</em>'); // *word* → accent italic
  const plain = (v) => String(v ?? '').replace(/\*/g, '');
  const slug = (v) => plain(v).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const tags = (list) => (list && list.length ? `<ul class="tags">${list.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}</ul>` : '');
  const chips = (list) => (list && list.length ? `<span class="tags">${list.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</span>` : ''); // for inside buttons
  const initials = (t) => esc(plain(t).split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase());
  // youtube: "https://youtu.be/ID" (any YouTube link form) → video thumbnail on cards, player in the popup
  const ytId = (u) => (String(u || '').match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/) || [])[1];
  const media = (p, cls) => {
    const yt = ytId(p.youtube);
    const img = p.image || (yt ? `https://i.ytimg.com/vi/${yt}/maxresdefault.jpg` : '');
    return img
      ? `<span class="${cls}${yt ? ' has-video' : ''}"><img src="${esc(img)}" alt="${esc(p.imageAlt || p.title)}" loading="lazy"></span>`
      : `<span class="${cls} thumb"${p.color ? ` style="--c:${esc(p.color)}"` : ''} aria-hidden="true">${initials(p.title)}</span>`;
  };
  const player = (p) => `<span class="dialog-media video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${ytId(p.youtube)}?rel=0" title="${esc(p.title)} video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></span>`;
  const external = (href) => /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';

  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const icons = {
    moon: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    left: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    right: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    trophy: svg('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>'),
    people: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>')
  };

  let count = 0;
  const head = (id, d) => `<div class="section-head reveal">
      <h2 id="${id}-title"><span class="num">${String(++count).padStart(2, '0')} / ${esc(d.nav || plain(d.title))}</span>${rich(d.title)}</h2>
      ${d.intro ? `<p>${esc(d.intro)}</p>` : ''}
    </div>`;
  const cats = (p) => esc((p.category || []).join('|'));

  const lanyard = (d) => `
    <div class="lanyard-wrap reveal">
      <div class="lanyard" id="lanyard">
        <span class="strap" aria-hidden="true"></span>
        <span class="clip" aria-hidden="true"></span>
        <button class="badge" type="button" aria-pressed="false" aria-label="ID card of ${esc(P.name)}. Press to flip.">
          <span class="badge-inner">
            <span class="badge-face badge-front">
              <span class="badge-slot" aria-hidden="true"></span>
              <img src="${esc(d.photo)}" alt="Portrait of ${esc(P.name)}" draggable="false">
              <span class="badge-info"><strong>${esc(P.name)}</strong><span>${esc(P.role)}</span></span>
            </span>
            <span class="badge-face badge-back">
              <span class="badge-slot" aria-hidden="true"></span>
              <strong>${esc(P.name)}</strong>
              <span class="badge-row"><small>Role</small>${esc(P.role)}</span>
              ${P.org ? `<span class="badge-row"><small>Studying</small>${esc(P.org)}</span>` : ''}
              ${P.location ? `<span class="badge-row"><small>Based in</small>${esc(P.location)}</span>` : ''}
              ${S.contact && S.contact.email ? `<span class="badge-row"><small>Email</small>${esc(S.contact.email)}</span>` : ''}
              ${P.available ? `<span class="badge-status"><span class="dot"></span>${esc(P.availableText)}</span>` : ''}
              <span class="barcode" aria-hidden="true"></span>
            </span>
          </span>
        </button>
      </div>
      <p class="lanyard-hint" aria-hidden="true">Drag me · tap to flip</p>
    </div>`;

  // Card grid shared by Awards and Leadership: each item has year (the small pill), title, detail, optional image
  const cardSection = (id, d, icon) => `
      <section class="section wrap" id="${id}" aria-labelledby="${id}-title">
        ${head(id, d)}
        <ul class="awards">${(d.items || []).map((a) => `
          <li class="award reveal">
            ${a.image ? `<span class="award-photo"><img src="${esc(a.image)}" alt="${esc(a.imageAlt || a.title)}" loading="lazy"></span>` : `<span class="award-icon">${icon}</span>`}
            <span class="award-year">${esc(a.year)}</span>
            <h3>${esc(a.title)}</h3>
            <p>${esc(a.detail)}</p>
          </li>`).join('')}
        </ul>
      </section>`;

  const sections = {
    hero: (d) => `
      <section class="hero wrap" id="top" aria-label="Introduction">
        ${FX.dataNetwork ? '<canvas class="hero-canvas" aria-hidden="true"></canvas>' : ''}
        ${P.available ? `<p class="eyebrow reveal"><span class="dot" aria-hidden="true"></span>${esc(P.availableText)}</p>` : ''}
        <h1 class="reveal">${(d.headline || []).map(rich).join('<br>')}</h1>
        <p class="intro reveal">${esc(d.intro)}</p>
        <div class="actions reveal">${(d.buttons || []).map((b, i) => `<a class="btn ${i ? 'btn-ghost' : 'btn-primary'}" href="${esc(b.href)}">${esc(b.label)}</a>`).join('')}</div>
        <div class="hero-meta reveal">
          ${P.location ? `<span>${esc(P.location)}</span>` : ''}
          ${P.timezone ? `<span>Local time <time id="local-time"></time></span>` : ''}
        </div>
      </section>
      ${S.marquee && S.marquee.length ? `<div class="marquee" aria-hidden="true"><div class="marquee-track">${[...S.marquee, ...S.marquee].map((m) => `<span>${esc(m)}</span>`).join('')}</div></div>` : ''}`,

    work: (d) => {
      const filters = [...new Set(projects.flatMap((p) => p.category || []))];
      const fi = projects.findIndex((p) => p.featured);
      const f = projects[fi];
      return `
      <section class="section wrap" id="work" aria-labelledby="work-title">
        ${head('work', d)}
        ${filters.length > 1 ? `<div class="filters reveal" role="group" aria-label="Filter projects">
          <button class="filter" type="button" data-filter="" aria-pressed="true">All <span>${projects.length}</span></button>
          ${filters.map((c) => `<button class="filter" type="button" data-filter="${esc(c)}" aria-pressed="false">${esc(c)} <span>${projects.filter((p) => (p.category || []).includes(c)).length}</span></button>`).join('')}
        </div>` : ''}
        ${f ? `<div class="featured-wrap reveal" data-cats="${cats(f)}"><button class="featured" type="button" data-project="${fi}">
          ${media(f, 'featured-media')}
          <span class="featured-body">
            <span class="featured-label">★ Featured · ${esc(f.role)}</span>
            <span class="featured-title">${esc(f.title)}</span>
            <span class="featured-text">${esc(f.description || f.summary)}</span>
            ${chips(f.tags)}
            <span class="featured-cta">View project ${icons.right}</span>
          </span>
        </button></div>` : ''}
        <ul class="projects">${projects.map((p, i) => i === fi ? '' : `
          <li class="project-item reveal" data-cats="${cats(p)}"><button class="project" type="button" data-project="${i}">
            <span class="project-index">${String(i + 1).padStart(2, '0')}</span>
            <span><span class="project-title">${esc(p.title)}</span><span class="project-sub">${esc(p.summary)}${p.year ? ` · ${esc(p.year)}` : ''}</span></span>
            ${media(p, 'project-thumb')}
          </button></li>`).join('')}
        </ul>
        <p class="filter-empty" hidden>No projects in this category yet.</p>
      </section>`;
    },

    about: (d) => `
      <section class="section wrap" id="about" aria-labelledby="about-title">
        ${head('about', d)}
        <div class="about-grid">
          <div class="about-text reveal">
            ${(d.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join('')}
            ${d.stats && d.stats.length ? `<div class="stats">${d.stats.map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('')}</div>` : ''}
          </div>
          ${d.photo && FX.lanyard ? lanyard(d) : media({ image: d.photo, imageAlt: `Portrait of ${P.name}`, title: P.name, color: '' }, 'about-photo reveal')}
        </div>
      </section>`,

    // A training programme / fellowship with its deliverables, grouped into tabs (e.g. Written, Visual, Data)
    programme: (d) => {
      const items = (d.groups || []).flatMap((g) => (g.items || []).map((it) => ({ ...it, group: g.name })));
      const groups = (d.groups || []).map((g) => g.name);
      const kind = (f) => (/\.pdf$/i.test(f) ? 'PDF' : /\.xlsx?$/i.test(f) ? 'Excel' : /\.pptx?$/i.test(f) ? 'Slides' : /\.docx?$/i.test(f) ? 'Word' : 'File');
      const cover = (it) => it.video
        ? `<video class="deliverable-media" controls preload="metadata" playsinline src="${esc(it.video)}#t=0.5"></video>`
        : it.image
          ? `<span class="deliverable-media"><img src="${esc(it.image)}" alt="${esc(it.imageAlt || it.title)}" loading="lazy"></span>`
          : `<span class="deliverable-media doc-cover"${it.color ? ` style="--c:${esc(it.color)}"` : ''} aria-hidden="true"><small>${esc(it.stage || it.group)}</small><strong>${esc(it.file ? kind(it.file) : 'File')}</strong></span>`;
      return `
      <section class="section wrap" id="programme" aria-labelledby="programme-title">
        ${head('programme', d)}
        <div class="programme-intro reveal">
          ${d.text ? `<p>${esc(d.text)}</p>` : ''}
          ${d.facts && d.facts.length ? `<dl class="facts">${d.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}</dl>` : ''}
        </div>
        ${groups.length > 1 ? `<div class="filters reveal" role="group" aria-label="Filter deliverables">
          <button class="filter" type="button" data-filter="" aria-pressed="true">All <span>${items.length}</span></button>
          ${groups.map((g) => `<button class="filter" type="button" data-filter="${esc(g)}" aria-pressed="false">${esc(g)} <span>${items.filter((it) => it.group === g).length}</span></button>`).join('')}
        </div>` : ''}
        <ul class="deliverables">${items.map((it) => `
          <li class="deliverable reveal" data-cats="${esc(it.group)}">
            ${cover(it)}
            <div class="deliverable-body">
              <p class="deliverable-meta">${it.stage ? `<span class="stage">${esc(it.stage)}</span>` : ''}${esc(it.group)}</p>
              <h3>${esc(it.title)}</h3>
              <p>${esc(it.summary)}</p>
              ${it.highlights && it.highlights.length ? `<ul class="results">${it.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
              ${tags(it.tags)}
              ${it.file ? `<a class="btn btn-ghost doc-link" href="${esc(it.file)}"${/\.pdf$/i.test(it.file) ? ' target="_blank" rel="noopener"' : ' download'}>${esc(it.fileLabel || (/\.pdf$/i.test(it.file) ? 'Open PDF' : 'Download ' + kind(it.file)))} ↗</a>` : ''}
            </div>
          </li>`).join('')}
        </ul>
      </section>`;
    },

    achievements: (d) => cardSection('achievements', d, icons.trophy),
    leadership: (d) => cardSection('leadership', d, icons.people),

    experience: (d) => `
      <section class="section wrap" id="experience" aria-labelledby="experience-title">
        ${head('experience', d)}
        <ol class="timeline">${(d.items || []).map((j) => `
          <li class="job reveal">
            <p class="job-date">${esc(j.dates)}</p>
            <div>
              <h3>${esc(j.role)} · ${j.url ? `<a href="${esc(j.url)}"${external(j.url)}>${esc(j.company)} ↗</a>` : esc(j.company)}</h3>
              <p>${esc(j.summary)}</p>
              ${tags(j.tags)}
            </div>
          </li>`).join('')}
        </ol>
        ${d.resume && d.resume.href ? `<a class="resume-link" href="${esc(d.resume.href)}"${external(d.resume.href)}>${esc(d.resume.label)}</a>` : ''}
      </section>`,

    skills: (d) => `
      <section class="section wrap" id="skills" aria-labelledby="skills-title">
        ${head('skills', d)}
        <div class="skill-groups">${(d.groups || []).map((g) => `
          <div class="skill-group reveal"><h3>${esc(g.name)}</h3>${tags(g.items)}</div>`).join('')}
        </div>
      </section>`,

    contact: (d) => `
      <section class="section wrap contact" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title" class="reveal">${rich(d.title)}</h2>
        <p class="reveal">${esc(d.text)}</p>
        <a class="email-link reveal" href="mailto:${esc(d.email)}">${esc(d.email)}</a>
        <ul class="socials reveal">${(d.socials || []).map((s) => `<li><a href="${esc(s.href)}"${external(s.href)}>${esc(s.label)}</a></li>`).join('')}</ul>
      </section>`
  };

  const order = (S.sections || Object.keys(sections)).filter((id) => sections[id] && S[id]);

  // Meta
  document.documentElement.lang = (S.meta && S.meta.lang) || 'en';
  if (S.meta) {
    document.title = S.meta.title || P.name || document.title;
    document.querySelector('meta[name="description"]').content = S.meta.description || '';
  }

  // Header, page, footer
  const navIds = order.filter((id) => id !== 'hero');
  document.getElementById('topbar').innerHTML = `<div class="wrap">
      <a class="brand" href="#top">${esc(P.name)}</a>
      <nav aria-label="Main"><ul class="nav" id="nav">${navIds.map((id) => `<li><a href="#${id}">${esc(S[id].nav || plain(S[id].title))}</a></li>`).join('')}</ul></nav>
      <div class="top-actions">
        <button class="icon-btn theme-btn" id="theme-toggle" type="button" aria-label="Switch light or dark mode"><span class="i-moon">${icons.moon}</span><span class="i-sun">${icons.sun}</span></button>
        <button class="icon-btn menu-btn" id="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav">${icons.menu}</button>
      </div>
    </div>`;
  main.innerHTML = order.map((id) => sections[id](S[id])).join('');
  document.getElementById('footer').innerHTML = `<div class="wrap">
      <span>© ${new Date().getFullYear()} ${esc(P.name)}. ${esc(S.footer && S.footer.text)}</span>
      <a href="#top">Back to top ↑</a>
    </div>`;

  // Theme toggle (choice remembered per visitor)
  const root = document.documentElement;
  try { const saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch (e) { /* storage blocked */ }
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = isDark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* storage blocked */ }
  });

  // Mobile menu
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menu-toggle');
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.innerHTML = open ? icons.close : icons.menu;
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

  // Header border on scroll + active nav link + scroll reveal
  const topbar = document.getElementById('topbar');
  addEventListener('scroll', () => topbar.classList.toggle('scrolled', scrollY > 8), { passive: true });
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) nav.querySelectorAll('a').forEach((a) => a.classList.toggle('active', a.hash === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    navIds.forEach((id) => spy.observe(document.getElementById(id)));

    const reveal = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  // Local time
  const timeEl = document.getElementById('local-time');
  if (timeEl) {
    try {
      const fmt = new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', timeZone: P.timezone });
      const tick = () => { timeEl.textContent = fmt.format(new Date()); };
      tick(); setInterval(tick, 30000);
    } catch (e) { timeEl.parentElement.remove(); } // invalid timezone name
  }

  // Cursor spotlight (mouse only)
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const glow = document.querySelector('.spotlight');
    addEventListener('pointermove', (e) => { glow.style.setProperty('--mx', e.clientX + 'px'); glow.style.setProperty('--my', e.clientY + 'px'); }, { passive: true });
  }

  // Filter buttons (projects, programme deliverables): each only affects its own section
  const applyFilter = (section, value) => {
    section.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.filter === value));
    let shown = 0;
    section.querySelectorAll('[data-cats]').forEach((el) => {
      const show = !value || el.dataset.cats.split('|').includes(value);
      el.hidden = !show;
      if (show) { shown++; el.classList.add('in'); }
    });
    const empty = section.querySelector('.filter-empty');
    if (empty) empty.hidden = shown > 0;
  };

  // Project details dialog: prev/next, arrow keys, shareable #project-name links
  const dlg = document.getElementById('project-dialog');
  const step = (dir) => openProject((current + dir + projects.length) % projects.length, dir);
  let current = -1;
  function openProject(i, focusDir) {
    const p = projects[i];
    const n = projects.length;
    const prev = projects[(i - 1 + n) % n];
    const next = projects[(i + 1) % n];
    current = i;
    dlg.innerHTML = `
      <button class="icon-btn dialog-close" type="button" aria-label="Close">${icons.close}</button>
      ${ytId(p.youtube) ? player(p) : media(p, 'dialog-media')}
      <div class="dialog-body">
        <p class="dialog-meta">${[p.year, p.role, `${i + 1} of ${n}`].filter(Boolean).map(esc).join(' · ')}</p>
        <h2>${esc(p.title)}</h2>
        <p>${esc(p.description || p.summary)}</p>
        ${p.results && p.results.length ? `<ul class="results">${p.results.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>` : ''}
        ${tags(p.tags)}
        ${p.link ? `<a class="btn btn-primary" href="${esc(p.link)}"${external(p.link)}>${esc(p.linkLabel || 'View project')} ↗</a>` : ''}
      </div>
      ${n > 1 ? `<div class="dialog-nav">
        <button class="step" type="button" data-step="-1">${icons.left}<span><small>Previous</small>${esc(prev.title)}</span></button>
        <button class="step step-next" type="button" data-step="1"><span><small>Next</small>${esc(next.title)}</span>${icons.right}</button>
      </div>` : ''}`;
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    if (focusDir) dlg.querySelector(`[data-step="${focusDir}"]`).focus();
    history.replaceState(null, '', '#project-' + slug(p.title));
  }

  main.addEventListener('click', (e) => {
    const f = e.target.closest('[data-filter]');
    if (f) return applyFilter(f.closest('section'), f.dataset.filter);
    const btn = e.target.closest('[data-project]');
    if (btn) openProject(+btn.dataset.project);
  });
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('.dialog-close')) return dlg.close();
    const s = e.target.closest('[data-step]');
    if (s) step(+s.dataset.step);
  });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  dlg.addEventListener('close', () => {
    dlg.innerHTML = ''; // stops a playing video, which would keep sounding in a hidden dialog
    history.replaceState(null, '', location.pathname + location.search);
  });

  // Open a shared project link like page.html#project-credit-card-fraud-detection
  const linked = location.hash.match(/^#project-(.+)$/);
  if (linked) {
    const i = projects.findIndex((p) => slug(p.title) === linked[1]);
    if (i > -1) openProject(i);
  }
})();
