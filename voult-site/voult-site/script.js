// VOULT — shared site behaviour

document.addEventListener('DOMContentLoaded', () => {

  // Render project cards from assets/data/projects-data.js (edited via admin.html).
  // Runs first, synchronously, so the reveal/slider/wireframe code below — which
  // queries the DOM once on this same tick — sees the cards that just got added.
  (function renderProjects() {
    const mainGrid = document.getElementById('proj-grid-main');
    const foundersGrid = document.getElementById('proj-grid-founders');
    if (!mainGrid && !foundersGrid) return;

    // If admin.html has unpublished edits saved in this browser, preview those
    // instead of the published file — lets you see admin changes instantly,
    // without downloading/replacing projects-data.js first.
    let projects = window.VOULT_PROJECTS || [];
    let isDraft = false;
    try {
      const draft = localStorage.getItem('voult_projects_draft');
      if (draft) { projects = JSON.parse(draft); isDraft = true; }
    } catch (e) { /* localStorage unavailable or bad JSON — fall back to published data */ }

    if (isDraft) {
      const banner = document.createElement('div');
      banner.style.cssText = 'position:fixed; top:0; left:0; right:0; z-index:150; background:#3d3011; color:#ffe9b8; font-family:var(--mono); font-size:12px; letter-spacing:.03em; text-align:center; padding:8px 12px;';
      banner.innerHTML = 'Previewing unpublished admin changes (only visible in this browser) — <a href="admin.html" style="color:#fff; text-decoration:underline;">back to admin</a>';
      document.body.prepend(banner);
      document.body.style.paddingTop = '34px';
    }

    const esc = (str) => String(str || '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    function cardHTML(p) {
      const images = (p.images || []).filter(img => img && img.src);
      const slidesHTML = images.map(img =>
        `<div class="proj-slide"><img src="${esc(img.src)}" alt="${esc(img.alt)}"></div>`
      ).join('');
      const sliderHTML = images.length > 1
        ? `<div class="proj-slider" data-slider>
             <div class="proj-slider-track">${slidesHTML}</div>
             <button class="slider-arrow prev" aria-label="Previous image">‹</button>
             <button class="slider-arrow next" aria-label="Next image">›</button>
             <div class="slider-dots"></div>
           </div>`
        : `<div class="proj-slider" data-slider><div class="proj-slider-track">${slidesHTML}</div></div>`;

      const tagHTML = p.tag ? `<span class="proj-tag status-live">${esc(p.tag)}</span>` : '';
      const metaHTML = `<div class="proj-meta-row"><span>${esc(p.location)}</span><span>${esc(p.role)}</span></div>`;

      if (p.wide) {
        return `<div class="proj-card proj-wide" data-project-id="${esc(p.id)}">
          <div class="proj-visual">${tagHTML}${sliderHTML}</div>
          <div class="proj-body">
            ${metaHTML}
            <h3>${esc(p.name)}</h3>
            ${p.description ? `<p style="color:var(--ink-70); font-size:15px; max-width:48ch;">${esc(p.description)}</p>` : ''}
          </div>
        </div>`;
      }
      return `<div class="proj-card" data-project-id="${esc(p.id)}">
        <div class="proj-visual">${tagHTML}${sliderHTML}</div>
        <h3>${esc(p.name)}</h3>
        ${metaHTML}
      </div>`;
    }

    if (mainGrid) {
      mainGrid.innerHTML = projects.filter(p => p.group === 'main').map(cardHTML).join('');
    }
    if (foundersGrid) {
      const html = projects.filter(p => p.group === 'founders').map(cardHTML).join('');
      foundersGrid.insertAdjacentHTML('afterbegin', html);
    }
  })();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Contact form — submits silently in the background via Web3Forms
  // straight to VOULT's real inbox. No page reload, no email app popup.
  const form = document.getElementById('contact-form');
  if (form) {
    const statusEl = document.getElementById('form-status');
    const statusDefault = statusEl ? statusEl.textContent : '';

    function setStatus(text, color) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.style.color = color || 'var(--steel)';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setStatus('Sending your message…');

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const data = await res.json();

        if (data.success) {
          btn.textContent = 'Message sent';
          setStatus('Thanks — your message is on its way. We\'ll be in touch shortly.', 'var(--coral)');
          form.reset();
        } else {
          btn.textContent = 'Something went wrong';
          setStatus(data.message || 'Something went wrong — please try again.', '#b3261e');
        }
      } catch (err) {
        btn.textContent = 'Network error';
        setStatus('Couldn\'t reach our server — please check your connection and try again.', '#b3261e');
      }

      setTimeout(() => { btn.textContent = original; btn.disabled = false; setStatus(statusDefault); }, 4000);
    });
  }

  // Expertise accordion — click a service and its details slide open downwards
  document.querySelectorAll('.svc-item').forEach(item => {
    const head = item.querySelector('.svc-head');
    if (!head) return;
    head.addEventListener('click', () => {
      item.classList.toggle('open');
      head.setAttribute('aria-expanded', item.classList.contains('open'));
    });
  });

  // Project image sliders (swipe + arrows + dots)
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const track = slider.querySelector('.proj-slider-track');
    const slides = Array.from(track.children);
    const dotsWrap = slider.querySelector('.slider-dots');
    const prevBtn = slider.querySelector('.slider-arrow.prev');
    const nextBtn = slider.querySelector('.slider-arrow.next');
    if (!track || slides.length < 2) return;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to image ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
      });
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function updateActive() {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    track.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateActive);
    }, { passive: true });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    });
  });

  // Wireframe building — self-drawing stroke animation
  document.querySelectorAll('.svg-wire path, .svg-wire line, .svg-wire polyline').forEach((el, i) => {
    const len = el.getTotalLength ? el.getTotalLength() : 200;
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    el.style.transition = `stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) ${i * 60}ms`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { el.style.strokeDashoffset = 0; });
    });
  });

});
