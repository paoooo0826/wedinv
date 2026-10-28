/* Optional RSVP destination. Use a real invitation response form URL or the
   couple's confirmed email address; leave both blank until details are ready. */
const WEDDING = Object.freeze({
  names: 'Sam & Yan',
  date: '2027-03-26T15:30:00+08:00',
  venue: 'D Manor Events Center',
  rsvpUrl: '',
  rsvpEmail: ''
});

const pages = [...document.querySelectorAll('[data-page]')];
const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');
const validPages = new Set(pages.map(p => p.dataset.page));
let opening = false;
const backToTop = document.getElementById('back-to-top');
function updateBackToTop() {
  const footerIsVisible = document.querySelector('footer').getBoundingClientRect().top < window.innerHeight;
  backToTop.hidden = invitation.hidden || window.scrollY < 600 || footerIsVisible;
}
window.addEventListener('scroll', updateBackToTop, {passive: true});
function scrollToPageTop() {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top: 0, behavior: reduceMotion ? 'instant' : 'smooth'});
  const heading = document.querySelector('[data-page]:not([hidden]) h2');
  if (heading) {heading.setAttribute('tabindex', '-1'); heading.focus({preventScroll: true});}
}
backToTop.addEventListener('click', scrollToPageTop);
document.querySelector('.footer-back-to-top').addEventListener('click', scrollToPageTop);
window.addEventListener('resize', updateBackToTop);

function showRoute({focus = false} = {}) {
  const requested = location.hash.slice(1);
  const page = validPages.has(requested) ? requested : '';
  cover.hidden = !!page;
  invitation.hidden = !page;
  pages.forEach(el => {
    el.hidden = el.dataset.page !== page;
    el.classList.toggle('entering', el.dataset.page === page);
  });
  document.querySelectorAll('.site-header nav a').forEach(a => {
    if (a.hash === '#' + page) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.title = page && page !== 'home'
    ? `${page === 'rsvp' ? 'RSVP' : page[0].toUpperCase() + page.slice(1)} — Sam & Yan`
    : 'Sam & Yan — A Wedding Invitation';
  if (focus && page) {
    const heading = document.querySelector(`[data-page="${page}"] h2`);
    heading.setAttribute('tabindex', '-1');
    heading.focus({preventScroll: true});
  }
  window.scrollTo({top: 0, behavior: 'instant'});
  updateBackToTop();
}

function openInvitation() {
  if (opening) return;
  opening = true;
  cover.classList.add('is-opening');
  const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 550;
  setTimeout(() => {
    location.hash = 'home';
    cover.classList.remove('is-opening');
    opening = false;
  }, delay);
}
document.getElementById('open-invitation').addEventListener('click', openInvitation);
document.getElementById('open-text').addEventListener('click', openInvitation);
document.querySelector('.skip-link').addEventListener('click', e => {
  e.preventDefault();
  if (invitation.hidden) openInvitation();
  else { document.getElementById('main').focus(); window.scrollTo({top: 0, behavior: 'instant'}); }
});
window.addEventListener('hashchange', () => showRoute({focus: true}));
showRoute();

const weddingTime = new Date(WEDDING.date).getTime();
function updateCountdown() {
  const remaining = Math.max(0, weddingTime - Date.now());
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60
  };
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, '0');
  });
  if (remaining === 0) {
    document.getElementById('countdown-caption').textContent = 'Our wedding day has arrived. Thank you for being part of our story.';
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);

const contact = document.getElementById('rsvp-contact');
let destination;
try {
  const url = new URL(WEDDING.rsvpUrl);
  if (url.protocol === 'https:') destination = url.href;
} catch { /* Keep the contact placeholder until a confirmed destination is set. */ }
if (!destination && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(WEDDING.rsvpEmail)) {
  destination = `mailto:${encodeURIComponent(WEDDING.rsvpEmail)}?subject=${encodeURIComponent('Wedding RSVP — Sam & Yan')}`;
}
if (destination) {
  const link = document.createElement('a');
  link.className = 'button'; link.href = destination; link.textContent = 'Confirm Your Attendance';
  if (destination.startsWith('https:')) {link.target = '_blank'; link.rel = 'noopener noreferrer';}
  contact.replaceChildren(link);
}
