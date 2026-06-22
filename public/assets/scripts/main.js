/* =====================================================
   ECOLOOT · main.js
   Navbar, scroll-reveal, contador animado, formulario
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVBAR: sombra al hacer scroll ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- NAVBAR: menú móvil ---------- */
  const burger = document.querySelector('.nav-burger');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- CONTADOR ANIMADO ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const val = target * eased;
        const shown = Number.isInteger(target) ? Math.round(val) : val.toFixed(0);
        el.textContent = prefix + shown + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target + suffix;
      };
      requestAnimationFrame(tick);
    };
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.textContent = (e.target.dataset.prefix || '') + '0' + (e.target.dataset.suffix || '');
          animate(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---------- FORMULARIO DE CONTACTO ---------- */
  const form = document.querySelector('#contact-form');
  if (form) {
    const toast = document.querySelector('#toast');
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if (toast) {
        toast.classList.add('show');
        form.reset();
        setTimeout(() => toast.classList.remove('show'), 4200);
      }
    });

    // Click en "motivos" rellena el select
    document.querySelectorAll('.reason').forEach(r => {
      r.addEventListener('click', () => {
        const select = form.querySelector('select');
        const val = r.dataset.value;
        if (select && val) {
          [...select.options].forEach(o => { if (o.value === val || o.textContent === val) select.value = o.value; });
          select.focus();
        }
      });
    });
  }

});
