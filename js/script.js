/**
 * ============================================================================
 * PREMIUM DIGITAL WEDDING INVITATION - PHASE 1 SCRIPT ENGINE
 * ============================================================================
 */

'use strict';

/* ----------------------------------------------------------------------------
   1. CENTRALIZED INVITATION CONFIGURATION (PHASE 1 PLACEHOLDERS)
   All configurable invitation content lives here for easy Phase 2 customization.
   ---------------------------------------------------------------------------- */
const INVITATION_CONFIG = {
  brideName: "Meghana",
  groomName: "Sai Prabhu",
  weddingDate: "2026-10-14T20:36:00",
  displayDate: "WEDNESDAY, OCTOBER 14, 2026 • 8:36 PM",
  invitationMessage: "Together with their families, cordially invite you to celebrate the holy wedding union of Meghana & Sai Prabhu.",
  venue: {
    name: "Sri Rama Palace Function Hall",
    address: "Garapati Complex, Arundelpet, Governor Peta, Vijayawada, Andhra Pradesh 520003 (Beside Hotel Ilapuram)",
    googleMapsUrl: "https://www.google.com/maps/search/Sri+Rama+Palace+Function+Hall,+Arundalpet,+Governor+Peta,+Vijayawada,+Andhra+Pradesh+520003"
  },
  audioSrc: "assets/audio/wedding-music.mp3",
  events: [
    {
      id: "event-01",
      number: "01",
      name: "Wedding Lunch",
      date: "OCTOBER 14, 2026",
      time: "12:00 PM (Afternoon)",
      location: "Bride's Residence",
      description: "Festive celebratory wedding lunch hosted at the Bride's Residence."
    },
    {
      id: "event-02",
      number: "02",
      name: "Sumuhurtham",
      date: "OCTOBER 14, 2026",
      time: "8:36 PM (Sumuhurtham)",
      location: "Sri Rama Palace Function Hall (Beside Hotel Ilapuram)",
      description: "The auspicious main wedding ceremony and holy union of Meghana & Sai Prabhu."
    }
  ],
  gallery: [
    {
      id: 1,
      title: "MOMENT 01",
      imgSrc: "assets/images/AVR_1664.webp"
    },
    {
      id: 2,
      title: "MOMENT 02",
      imgSrc: "assets/images/AVR_1741.webp"
    },
    {
      id: 3,
      title: "MOMENT 03",
      imgSrc: "assets/images/AVR_1744.webp"
    },
    {
      id: 4,
      title: "MOMENT 04",
      imgSrc: "assets/images/AVR_1750.webp"
    },
    {
      id: 5,
      title: "MOMENT 05",
      imgSrc: "assets/images/AVR_1907.webp"
    },
    {
      id: 6,
      title: "MOMENT 06",
      imgSrc: "assets/images/AVR_1930.webp"
    }
  ]
};

/* ----------------------------------------------------------------------------
   2. DOM POPULATION ENGINE
   ---------------------------------------------------------------------------- */
function populateConfigData() {
  // Populate simple data-config text attributes
  document.querySelectorAll('[data-config]').forEach(el => {
    const keyPath = el.getAttribute('data-config');
    const value = getNestedValue(INVITATION_CONFIG, keyPath);
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  // Populate data-config-href attributes
  document.querySelectorAll('[data-config-href]').forEach(el => {
    const keyPath = el.getAttribute('data-config-href');
    const value = getNestedValue(INVITATION_CONFIG, keyPath);
    if (value !== undefined) {
      el.setAttribute('href', value);
    }
  });

  // Render 2 Events Timeline
  renderEventsTimeline();

  // Render Photo Gallery Cards
  renderGalleryGrid();
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
}

function renderEventsTimeline() {
  const renderEvent = (evt, idx) => {
    const isEven = idx % 2 === 1;
    return `
      <article class="event-card glass-card reveal-on-scroll ${isEven ? 'even' : 'odd'}" id="${evt.id}">
        <div class="event-badge-number">${evt.number}</div>
        <h4 class="event-name">${escapeHTML(evt.name)}</h4>
        <div class="event-meta">
          <div class="event-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
            </svg>
            <span>${escapeHTML(evt.date)}</span>
          </div>
          <div class="event-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${escapeHTML(evt.time)}</span>
          </div>
          <div class="event-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${escapeHTML(evt.location)}</span>
          </div>
        </div>
        <p class="event-desc">${escapeHTML(evt.description)}</p>
      </article>
    `;
  };

  const firstContainer = document.getElementById('events-timeline-container');
  const secondContainer = document.getElementById('event-02-container');
  if (firstContainer && INVITATION_CONFIG.events[0]) {
    firstContainer.innerHTML = renderEvent(INVITATION_CONFIG.events[0], 0);
  }
  if (secondContainer && INVITATION_CONFIG.events[1]) {
    secondContainer.innerHTML = renderEvent(INVITATION_CONFIG.events[1], 1);
  }
}

function renderGalleryGrid() {
  const renderGalleryItem = (item) => {
    const hasImg = !!item.imgSrc;
    return `
      <div class="gallery-card reveal-on-scroll ${hasImg ? 'has-real-img' : ''}" data-gallery-id="${item.id}" style="${item.gradient ? 'background: ' + item.gradient : ''}" role="button" tabindex="0" aria-label="View ${escapeHTML(item.title)}">
        ${hasImg ? `
          <img src="${escapeHTML(item.imgSrc)}" alt="${escapeHTML(item.title)}" class="gallery-card-img image-loading" loading="eager" decoding="async" />
          <span class="gallery-image-loader" aria-label="Loading image"></span>
        ` : `
          <div class="gallery-card-inner-svg">
            ${getOrnamentalSVG(item.svgType)}
          </div>
        `}
        <div class="gallery-card-caption">
          <h4 class="gallery-card-title">${escapeHTML(item.title)}</h4>
          ${item.subtitle ? `<p class="gallery-card-subtitle">${escapeHTML(item.subtitle)}</p>` : ''}
        </div>
        <div class="gallery-card-overlay">
          <div class="gallery-view-icon">🔍</div>
        </div>
      </div>
    `;
  };

  const firstContainer = document.getElementById('gallery-grid-container');
  const secondContainer = document.getElementById('gallery-row-2-container');
  if (firstContainer) {
    firstContainer.innerHTML = INVITATION_CONFIG.gallery.slice(0, 3).map(renderGalleryItem).join('');
  }
  if (secondContainer) {
    secondContainer.innerHTML = INVITATION_CONFIG.gallery.slice(3).map(renderGalleryItem).join('');
  }
}

function initGalleryImageLoading() {
  document.querySelectorAll('.gallery-card-img').forEach(image => {
    const loader = image.nextElementSibling;
    const markLoaded = () => {
      image.classList.remove('image-loading');
      if (loader) loader.classList.add('is-hidden');
    };
    image.addEventListener('load', markLoaded, { once: true });
    image.addEventListener('error', markLoaded, { once: true });
    if (image.complete) markLoaded();
  });
}

function getOrnamentalSVG(type) {
  switch (type) {
    case 'mandala':
      return `<svg width="48" height="48" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="var(--gold-light)" stroke-width="1.5"/><path d="M50 10 C60 30 70 40 90 50 C70 60 60 70 50 90 C40 70 30 60 10 50 C30 40 40 30 50 10 Z" fill="var(--gold-primary)" opacity="0.6"/></svg>`;
    case 'paisley':
      return `<svg width="48" height="48" viewBox="0 0 100 100" fill="none"><path d="M30 70 C10 40 40 10 70 30 C90 50 70 80 50 80 C35 80 30 70 30 70 Z" fill="var(--gold-primary)" opacity="0.7"/><circle cx="55" cy="45" r="8" fill="var(--gold-light)"/></svg>`;
    case 'rings':
      return `<svg width="48" height="48" viewBox="0 0 100 100" fill="none"><circle cx="38" cy="50" r="22" stroke="var(--gold-light)" stroke-width="2.5"/><circle cx="62" cy="50" r="22" stroke="var(--gold-primary)" stroke-width="2.5"/><polygon points="50,20 54,28 50,36 46,28" fill="var(--gold-bright)"/></svg>`;
    case 'floral':
      return `<svg width="48" height="48" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="10" fill="var(--gold-light)"/><circle cx="50" cy="25" r="12" fill="var(--gold-primary)" opacity="0.6"/><circle cx="75" cy="50" r="12" fill="var(--gold-primary)" opacity="0.6"/><circle cx="50" cy="75" r="12" fill="var(--gold-primary)" opacity="0.6"/><circle cx="25" cy="50" r="12" fill="var(--gold-primary)" opacity="0.6"/></svg>`;
    case 'peacock':
      return `<svg width="48" height="48" viewBox="0 0 100 100" fill="none"><path d="M50 85 C30 85 20 60 50 15 C80 60 70 85 50 85 Z" fill="var(--gold-primary)" opacity="0.7"/><circle cx="50" cy="45" r="8" fill="var(--gold-light)"/></svg>`;
    default: // lotus
      return `<svg width="48" height="48" viewBox="0 0 100 100" fill="none"><path d="M50 20 C60 40 80 50 85 70 C65 75 55 65 50 85 C45 65 35 75 15 70 C20 50 40 40 50 20 Z" fill="var(--gold-primary)" opacity="0.8"/></svg>`;
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ----------------------------------------------------------------------------
   3. ENVELOPE UNSEALING & CARDS EXTRACTION ANIMATION
   ---------------------------------------------------------------------------- */
function initEnvelopeState() {
  const openBtn = document.getElementById('open-invitation-btn');
  const continueBtn = document.getElementById('continue-invitation-btn');
  const btnContainer = document.querySelector('.open-btn-container');
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const envelopeCard = document.getElementById('envelope-card');
  const openingScreen = document.getElementById('opening-screen');
  const mainContent = document.getElementById('main-invitation');

  if (!openBtn || !envelopeWrapper) return;

  const triggerOpenSequence = (e) => {
    if (e) e.stopPropagation();
    if (envelopeWrapper.classList.contains('is-opening')) return;

    envelopeWrapper.classList.add('is-opening');

    // Trigger burst particles from seal center
    triggerParticleBurst();

    // After card finishes rising (~1.1s), reveal the CONTINUE TO INVITATION button so guest can read first
    setTimeout(() => {
      if (btnContainer) {
        btnContainer.classList.add('show-continue');
      }
    }, 1100);
  };

  const proceedToMainInvitation = () => {
    // Always begin the invitation at the hero section, even if the browser
    // restored a previous scroll position while the opening overlay was open.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    openingScreen.classList.add('fade-out');
    document.body.classList.remove('envelope-active');
    mainContent.classList.add('is-visible');
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });

    // Initialize scroll reveal after envelope hides
    initScrollReveal();
  };

  openBtn.addEventListener('click', triggerOpenSequence);
  envelopeWrapper.addEventListener('click', (e) => {
    if (!envelopeWrapper.classList.contains('is-opening')) {
      triggerOpenSequence(e);
    } else {
      proceedToMainInvitation();
    }
  });

  envelopeWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!envelopeWrapper.classList.contains('is-opening')) {
        triggerOpenSequence(e);
      } else {
        proceedToMainInvitation();
      }
    }
  });

  if (continueBtn) {
    continueBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      proceedToMainInvitation();
    });
  }

  if (envelopeCard) {
    envelopeCard.addEventListener('click', (e) => {
      if (envelopeWrapper.classList.contains('is-opening')) {
        e.stopPropagation();
        proceedToMainInvitation();
      }
    });
  }
}

/* ----------------------------------------------------------------------------
   4. CANVAS PETALS & PARTICLES SYSTEM
   ---------------------------------------------------------------------------- */
let canvas, ctx;
let particles = [];
const PARTICLE_COUNT = 30;

function initParticleCanvas() {
  canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle(x, y, isBurst = false) {
  const currentTheme = document.body.getAttribute('data-theme') || 'emerald-gold';
  let pColor;

  if (currentTheme === 'emerald-gold') {
    pColor = Math.random() > 0.4 ? 'rgba(212, 175, 55, ' + (Math.random() * 0.5 + 0.3) + ')' : 'rgba(232, 240, 198, ' + (Math.random() * 0.6 + 0.3) + ')';
  } else if (currentTheme === 'sapphire-rose') {
    pColor = Math.random() > 0.4 ? 'rgba(232, 157, 162, ' + (Math.random() * 0.5 + 0.3) + ')' : 'rgba(250, 218, 221, ' + (Math.random() * 0.6 + 0.3) + ')';
  } else if (currentTheme === 'crimson-gold') {
    pColor = Math.random() > 0.4 ? 'rgba(229, 169, 60, ' + (Math.random() * 0.5 + 0.3) + ')' : 'rgba(255, 229, 180, ' + (Math.random() * 0.6 + 0.3) + ')';
  } else if (currentTheme === 'plum-platinum') {
    pColor = Math.random() > 0.4 ? 'rgba(209, 213, 219, ' + (Math.random() * 0.5 + 0.3) + ')' : 'rgba(243, 244, 246, ' + (Math.random() * 0.6 + 0.3) + ')';
  } else {
    pColor = Math.random() > 0.4 ? 'rgba(212, 175, 55, ' + (Math.random() * 0.5 + 0.3) + ')' : 'rgba(243, 229, 171, ' + (Math.random() * 0.6 + 0.3) + ')';
  }

  return {
    x: x !== undefined ? x : Math.random() * (canvas ? canvas.width : 500),
    y: y !== undefined ? y : Math.random() * (canvas ? canvas.height : 500),
    size: isBurst ? Math.random() * 6 + 3 : Math.random() * 4 + 2,
    speedX: isBurst ? (Math.random() - 0.5) * 8 : Math.random() * 1 - 0.5,
    speedY: isBurst ? (Math.random() - 0.5) * 8 - 2 : Math.random() * 0.8 + 0.3,
    color: pColor,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.05,
    life: isBurst ? 1 : undefined,
    decay: isBurst ? Math.random() * 0.02 + 0.015 : 0
  };
}

function triggerParticleBurst() {
  if (!canvas) return;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < 40; i++) {
    particles.push(createParticle(centerX, centerY, true));
  }
}

function animateParticles() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;

    if (p.life !== undefined) {
      ctx.globalAlpha = p.life;
      p.life -= p.decay;
    }

    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.lineTo(p.size * 0.6, 0);
    ctx.lineTo(0, p.size);
    ctx.lineTo(-p.size * 0.6, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    if (p.life !== undefined && p.life <= 0) {
      particles.splice(i, 1);
    } else if (p.life === undefined && p.y > canvas.height + 10) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(animateParticles);
}

/* ----------------------------------------------------------------------------
   5. DYNAMIC COUNTDOWN TIMER
   ---------------------------------------------------------------------------- */
function initCountdownTimer() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function updateTimer() {
    const targetDate = new Date(INVITATION_CONFIG.weddingDate).getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (isNaN(targetDate) || diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ----------------------------------------------------------------------------
   6. GALLERY LIGHTBOX MODAL
   ---------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxBody = document.getElementById('lightbox-body');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const overlay = document.getElementById('lightbox-overlay');

  if (!lightbox) return;

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (!card) return;

    const id = parseInt(card.getAttribute('data-gallery-id'), 10);
    const item = INVITATION_CONFIG.gallery.find(g => g.id === id);
    if (!item) return;

    if (item.imgSrc) {
      lightboxBody.style.background = 'none';
      lightboxBody.innerHTML = `<img src="${escapeHTML(item.imgSrc)}" alt="${escapeHTML(item.title)}" class="lightbox-img" />`;
    } else {
      lightboxBody.style.background = item.gradient || 'none';
      lightboxBody.innerHTML = getOrnamentalSVG(item.svgType);
    }
    lightboxCaption.textContent = item.title + (item.subtitle ? " — " + item.subtitle : "");

    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (overlay) overlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
      closeLightbox();
    }
  });
}

/* ----------------------------------------------------------------------------
   7. THEME COLOR PALETTE SWITCHER ENGINE
   ---------------------------------------------------------------------------- */
function initThemeControl() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themePopover = document.getElementById('theme-popover');
  const swatches = document.querySelectorAll('.theme-swatch');

  if (!themeToggleBtn || !themePopover) return;

  const savedTheme = localStorage.getItem('invitation-theme');
  if (savedTheme && [...swatches].some(swatch => swatch.dataset.themeId === savedTheme)) {
    document.body.setAttribute('data-theme', savedTheme);
    swatches.forEach(swatch => {
      swatch.classList.toggle('active', swatch.dataset.themeId === savedTheme);
    });
  }

  // Toggle Popover Menu
  themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themePopover.classList.toggle('hidden-popover');
  });

  // Close Popover when clicking outside
  document.addEventListener('click', (e) => {
    if (!themePopover.contains(e.target) && e.target !== themeToggleBtn) {
      themePopover.classList.add('hidden-popover');
    }
  });

  // Handle Theme Selection
  swatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeId = swatch.getAttribute('data-theme-id');
      if (!themeId) return;

      // Update Active Class
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      // Set Data Theme Attribute on Body
      document.body.setAttribute('data-theme', themeId);
      localStorage.setItem('invitation-theme', themeId);

      // Re-trigger Canvas Particles to reflect new color palette
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }

      const themeName = swatch.querySelector('.swatch-name')?.textContent || themeId;
      showToast(`Theme changed to ${themeName}`);

      themePopover.classList.add('hidden-popover');
    });
  });
}

function initShareControl() {
  const shareButton = document.getElementById('share-invitation-btn');
  if (!shareButton) return;

  shareButton.addEventListener('click', async () => {
    const shareData = {
      title: 'Meghana & Sai Prabhu — Wedding Invitation',
      text: 'Join us for the wedding celebration of Meghana & Sai Prabhu.',
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Invitation link copied');
      return;
    }

    showToast('Copy this invitation link from your browser address bar');
  });
}

/* ----------------------------------------------------------------------------
   8. MUSIC CONTROL
   ---------------------------------------------------------------------------- */
function initMusicControl() {
  const musicBtn = document.getElementById('music-toggle-btn');
  const musicStatusText = document.getElementById('music-status-text');
  const audio = new Audio(INVITATION_CONFIG.audioSrc);
  let isPlaying = false;

  if (!musicBtn) return;

  audio.loop = true;
  audio.preload = 'metadata';

  const updateMusicState = (playing) => {
    isPlaying = playing;
    musicBtn.classList.toggle('is-playing', playing);
    musicStatusText.textContent = playing ? "PLAYING" : "PAUSED";
    musicBtn.setAttribute('aria-label', playing ? 'Pause Background Music' : 'Play Background Music');
  };

  musicBtn.addEventListener('click', async () => {
    if (isPlaying) {
      audio.pause();
      updateMusicState(false);
      showToast("Music Paused");
      return;
    }

    try {
      await audio.play();
      updateMusicState(true);
      showToast("Music Playing");
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        showToast("Music playback was blocked by the browser");
        return;
      }
      if (error.name === 'NotSupportedError') {
        showToast("This audio file cannot be played. Please provide a valid MP3 or WAV file.");
        return;
      }
      console.error('Unable to play invitation music:', error);
      showToast("Unable to play music");
    }
  });

  audio.addEventListener('ended', () => {
    updateMusicState(false);
  });
}

function showToast(message) {
  const toast = document.getElementById('site-toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ----------------------------------------------------------------------------
   9. SCROLL REVEAL & FLOATING NAV OBSERVERS
   ---------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

function initFloatingNav() {
  const nav = document.getElementById('floating-nav');
  const hero = document.getElementById('hero');

  if (!nav || !hero) return;

  window.addEventListener('scroll', () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 100) {
      nav.classList.remove('hidden-nav');
    } else {
      nav.classList.add('hidden-nav');
    }
  });
}

function initSectionNavigation() {
  const sections = [...document.querySelectorAll('.main-invitation-content .invitation-section')];
  if (sections.length < 2) return;

  let isNavigating = false;
  let touchStartY = null;
  let touchStartX = null;

  const getNavHeight = () => {
    const nav = document.getElementById('floating-nav');
    return nav ? nav.getBoundingClientRect().height : 0;
  };

  const getCurrentSectionIndex = () => {
    const targetTop = window.scrollY + getNavHeight() + 8;
    return sections.reduce((closestIndex, section, index) => {
      return Math.abs(section.offsetTop - targetTop) <
        Math.abs(sections[closestIndex].offsetTop - targetTop)
        ? index
        : closestIndex;
    }, 0);
  };

  const goToSection = (direction) => {
    if (document.body.classList.contains('envelope-active') ||
        document.querySelector('.lightbox-modal.is-active') ||
        isNavigating) {
      return;
    }

    const nextIndex = Math.max(
      0,
      Math.min(sections.length - 1, getCurrentSectionIndex() + direction)
    );
    if (nextIndex === getCurrentSectionIndex()) return;

    isNavigating = true;
    sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      isNavigating = false;
    }, 1650);
  };

  document.addEventListener('wheel', (event) => {
    const isHorizontalGesture =
      Math.abs(event.deltaX) > 1 &&
      Math.abs(event.deltaX) > Math.abs(event.deltaY);

    if (isHorizontalGesture) {
      event.preventDefault();
      goToSection(event.deltaX > 0 ? 1 : -1);
      return;
    }

    if (Math.abs(event.deltaY) < 1) return;
    event.preventDefault();
    goToSection(event.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
    touchStartX = event.touches[0].clientX;
  }, { passive: false });

  document.addEventListener('touchend', (event) => {
    if (touchStartY === null || touchStartX === null) return;
    const verticalDistance = touchStartY - event.changedTouches[0].clientY;
    const horizontalDistance = touchStartX - event.changedTouches[0].clientX;
    touchStartY = null;
    touchStartX = null;

    if (Math.abs(horizontalDistance) > 30 &&
        Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
      event.preventDefault();
      goToSection(horizontalDistance > 0 ? 1 : -1);
      return;
    }

    if (Math.abs(verticalDistance) < 20) return;
    goToSection(verticalDistance > 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      goToSection(1);
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      goToSection(-1);
    }
  });
}

/* ----------------------------------------------------------------------------
   10. MAIN INITIALIZATION HANDLER
   ---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Populate configuration
  populateConfigData();
  initGalleryImageLoading();

  // Initialize envelope unsealing
  initEnvelopeState();

  // Initialize canvas particle background
  initParticleCanvas();

  // Initialize countdown timer
  initCountdownTimer();

  // Initialize gallery lightbox
  initGalleryLightbox();

  // Initialize theme color switcher
  initThemeControl();
  initShareControl();

  // Initialize visual music control
  initMusicControl();

  // Initialize floating navigation
  initFloatingNav();

  // Move exactly one invitation section per wheel, swipe, or arrow action
  initSectionNavigation();
});
