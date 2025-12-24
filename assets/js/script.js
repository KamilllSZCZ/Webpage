document.addEventListener('DOMContentLoaded', function(){
  // set current year in footer
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // small accessibility: ensure skip link becomes visible on focus
  const skip = document.querySelector('.skip-link');
  if(skip){
    skip.addEventListener('click', ()=>{document.getElementById('main').focus();});
  }

  // mobile nav toggle (simple, no frameworks)
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      if(nav.style.display === 'block'){
        nav.style.display = '';
      } else {
        nav.style.display = 'block';
      }
    });

    // close nav after clicking a link (mobile)
    nav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        if(window.innerWidth < 768){ nav.style.display = ''; }
      });
    });

    // keep nav behavior consistent on resize
    window.addEventListener('resize', ()=>{
      if(window.innerWidth >= 768){ nav.style.display = ''; }
    });
  }

  // hide header on scroll down, show on scroll up
  const header = document.querySelector('.site-header');
  if(header){
    let lastScroll = window.scrollY || 0;
    const delta = 10; // threshold to avoid jitter
    window.addEventListener('scroll', ()=>{
      const current = window.scrollY || 0;
      if(Math.abs(current - lastScroll) <= delta) return;
      if(current > lastScroll && current > 80){
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
      lastScroll = current;
    }, {passive:true});
  }

  // Lightbox for gallery images (simple, accessible)
  const lightbox = document.getElementById('lightbox');
  const lbImage = lightbox && lightbox.querySelector('.lb-image');
  const lbCaption = lightbox && lightbox.querySelector('.lb-caption');
  const lbClose = lightbox && lightbox.querySelector('.lb-close');
  let lastFocused = null;

  // add reveal class to elements we want to animate
  document.querySelectorAll('.service-card, .reasons li, .gallery-grid figure, .about p, .contact-card').forEach(el=> el.classList.add('reveal'));

  // IntersectionObserver for reveals
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', (e) => {
      if(!lightbox) return;
      const src = img.dataset.full || img.src;
      lbImage.src = src;
      lbImage.alt = img.alt || '';
      lbCaption.textContent = img.nextElementSibling ? img.nextElementSibling.textContent : '';
      lightbox.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      lastFocused = document.activeElement;
      lbClose.focus();
    });
  });

  if(lbClose){
    lbClose.addEventListener('click', ()=>{
      lightbox.setAttribute('aria-hidden','true');
      lbImage.src = '';
      document.body.style.overflow = '';
      if(lastFocused) lastFocused.focus();
    });
  }
  // close on overlay click
  if(lightbox){
    lightbox.addEventListener('click', (e)=>{
      if(e.target === lightbox){
        lightbox.setAttribute('aria-hidden','true');
        lbImage.src = '';
        document.body.style.overflow = '';
        if(lastFocused) lastFocused.focus();
      }
    });
    // close on Esc and trap focus
    window.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false'){
        lightbox.setAttribute('aria-hidden','true');
        lbImage.src = '';
        document.body.style.overflow = '';
        if(lastFocused) lastFocused.focus();
      }
      if(e.key === 'Tab' && lightbox.getAttribute('aria-hidden') === 'false'){
        // basic focus trap
        const focusable = Array.from(lightbox.querySelectorAll('button, a, [href], input, textarea, [tabindex]:not([tabindex="-1"])')).filter(Boolean);
        if(focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length-1];
        if(e.shiftKey && document.activeElement === first){
          e.preventDefault(); last.focus();
        } else if(!e.shiftKey && document.activeElement === last){
          e.preventDefault(); first.focus();
        }
      }
    });
  }
});
